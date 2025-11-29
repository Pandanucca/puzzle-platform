import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const connectDB = async (): Promise<void> => {
  try {
    // Create in-memory MongoDB instance
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    // Connect to the in-memory database
    const conn = await mongoose.connect(uri);
    
    console.log(`🗄️ MongoDB Connected (In-Memory): ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

export const closeDB = async (): Promise<void> => {
  try {
    if (mongod) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      await mongod.stop();
      console.log('🗄️ In-memory MongoDB closed');
    }
  } catch (error) {
    console.error('❌ Error closing database:', error);
    process.exit(1);
  }
};

export const clearDB = async (): Promise<void> => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('🔌 MongoDB disconnected');
});

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB connection error:', error);
});

export default mongoose;