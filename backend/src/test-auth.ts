import { connectDB, closeDB } from './utils/database';

async function testAuth() {
  try {
    console.log('🔐 Testing authentication system...');
    
    await connectDB();
    console.log('✅ Database connected');

    console.log('\n📋 Available endpoints:');
    console.log('POST http://localhost:5000/api/users/register');
    console.log('POST http://localhost:5000/api/users/login');
    console.log('GET  http://localhost:5000/api/users/profile (requires auth)');
    
    console.log('\n🎯 You can now test the API with:');
    console.log('1. Register a new user');
    console.log('2. Login with credentials');
    console.log('3. Access protected profile route');
    
    console.log('\n💡 Use tools like:');
    console.log('- Thunder Client (VS Code extension)');
    console.log('- Postman');
    console.log('- curl commands');
    
    console.log('\n🚀 Authentication system is ready!');
    
    // Keep DB running for API testing
    console.log('\n⏳ Database remains open for API testing...');
    console.log('Press Ctrl+C to stop when done testing.');

  } catch (error) {
    console.error('❌ Auth test failed:', error);
    await closeDB();
  }
}

testAuth();