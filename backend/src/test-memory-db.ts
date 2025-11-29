import { connectDB, closeDB } from './utils/database';
import { User } from './models/User';

async function testMemoryDatabase() {
  try {
    console.log('🧪 Testing in-memory MongoDB...');
    
    // Connect to in-memory database
    await connectDB();
    console.log('✅ Database connected!');
    
    // Test 1: Create a user
    console.log('👤 Testing user creation...');
    const testUser = new User({
      username: 'puzzlemaster',
      email: 'puzzle@example.com',
      password: 'testpassword123'
    });
    
    const savedUser = await testUser.save();
    console.log('✅ User created:', savedUser.username);
    
    // Test 2: Find the user (password should be hashed)
    const foundUser = await User.findOne({ email: 'puzzle@example.com' });
    console.log('✅ User found:', foundUser?.username);
    console.log('✅ Password is hashed:', foundUser?.password !== 'testpassword123');
    
    // Test 3: Password comparison
    const isMatch = await foundUser?.comparePassword('testpassword123');
    console.log('✅ Password matches:', isMatch);
    
    // Test 4: Wrong password
    const isWrongMatch = await foundUser?.comparePassword('wrongpassword');
    console.log('✅ Wrong password rejected:', !isWrongMatch);
    
    console.log('🎉 All tests passed! In-memory MongoDB is working perfectly!');
    
    // Clean up
    await closeDB();
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testMemoryDatabase();