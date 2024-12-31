import request from 'supertest'
import dotenv from 'dotenv'
import app from '../index.js'
import User from '../controllers/user-controller.js'
import mongoose from 'mongoose'

let token = '';
let userId = '';

dotenv.config({ path: "./config/test.env" }) //loading variables for the testdb from the test environment

//beforeAll makes sures the code to be run before running the test cases
//properly connecting the test database
//server doesn't needs to be started when in test environment
beforeAll(async () => {
    // Connect to the test database
    const dbURL = process.env.MONGODB_URL;
    await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Test database connected');

    // Clear the database
    await mongoose.connection.collection('users').deleteMany({});
    
    // Register a test user and store the token
    const response = await request(app)
        .post('/user/register')
        .send({
            name: 'Test User',
            email: 'testuser@test.com',
            contact: '1234567890',
            password: 'password123',
            tech_stack: 'Node.js, MongoDB',
            field_of_interest: 'Web Development',
            experience_level: 'Beginner',
            bio: 'Just a test user'
        });

    token = response.body.token;  // Store JWT token for authenticated routes
    userId = response.body.savedUser._id;  // Save the user ID for further tests
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe('User Controller Tests', () => {

    it('should register a new user', async () => {
      const response = await request(app)
        .post('/user/register')
        .send({
          name: 'Another User',
          email: 'anotheruser@test.com',
          contact: '9876543210',
          password: 'password123',
          tech_stack: 'React, Node.js',
          field_of_interest: 'Frontend Development',
          experience_level: 'Intermediate',
          bio: 'Just another test user'
        });
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.savedUser).toHaveProperty('email', 'anotheruser@test.com');
    });
})