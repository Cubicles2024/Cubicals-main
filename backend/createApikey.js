import mongoose from 'mongoose';
import readline from 'readline';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Configure dotenv with proper path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const connectDB = async () => {
  try {
    // Debug: Check if .env file is being loaded properly
    console.log('Current directory:', __dirname);
    
    // Debug: Check if MONGO_URI is available (showing only first few chars for security)
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('Error: MONGO_URI is not defined in environment variables');
      console.log('Checking for .env file...');
      
      const envPath = path.resolve(__dirname, '.env');
      if (fs.existsSync(envPath)) {
        console.log('.env file exists at:', envPath);
        console.log('Content preview (first line):');
        const content = fs.readFileSync(envPath, 'utf8');
        const firstLine = content.split('\n')[0];
        console.log(firstLine.includes('MONGO_URI') ? 'MONGO_URI exists in first line' : 'MONGO_URI not found in first line');
      } else {
        console.error('.env file not found at:', envPath);
      }
      
      // Try to get MONGO_URI from parent directory
      console.log('Trying to load .env from parent directory...');
      dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
      
      if (!process.env.MONGO_URI) {
        console.error('Error: MONGO_URI still not available');
        process.exit(1);
      }
    }
    
    // Show a masked version of the URI for debugging
    const maskedUri = mongoUri 
      ? `${mongoUri.split('://')[0]}://${mongoUri.split('@').length > 1 ? '***:***@' + mongoUri.split('@')[1] : '***'}`
      : 'undefined';
    console.log('Using MongoDB URI:', maskedUri);

    // Connect with more detailed options and error handling
    await mongoose.connect(process.env.MONGO_URI, { 
      serverSelectionTimeoutMS: 20000,
      connectTimeoutMS: 30000,
    });
    
    console.log('Connected to MongoDB successfully!');
    promptUser();
  } catch (err) {
    console.error('MongoDB connection error:', err);
    
    // Additional diagnostics for connection issues
    if (err.name === 'MongoServerSelectionError') {
      console.error('Failed to connect to MongoDB server. Please check:');
      console.error('1. Network connectivity');
      console.error('2. MongoDB service status');
      console.error('3. Firewall rules');
      console.error('4. Correct credentials in connection string');
    }
    
    process.exit(1);
  }
};

// Function to prompt user for details
const promptUser = () => {
  rl.question('Enter Partner Name: ', (partnerName) => {
    rl.question('Enter Partner Email: ', (partnerEmail) => {
      rl.question('Enter Partner Company: ', async (partnerCompany) => {
        await createApiKey(partnerName, partnerEmail, partnerCompany);
        rl.close();
        mongoose.connection.close();
      });
    });
  });
};

// Function to generate a random API key
const generateApiKey = () => {
  return crypto.randomBytes(24).toString('hex');
};

// Function to create an API key
const createApiKey = async (name, email, company) => {
  try {
    // In a full implementation, you'd save this to the database
    // For now, we'll just generate and display it
    const apiKey = generateApiKey();
    
    console.log('\n===============================');
    console.log('API Key created successfully!');
    console.log('===============================');
    console.log(`Partner: ${name} (${company})`);
    console.log(`Email: ${email}`);
    console.log(`API Key: ${apiKey}`);
    console.log('\nMake sure to save this API key as it will not be shown again.');
    console.log('Add this API key to your .env file as B2B_API_KEY=your-api-key');
    console.log('===============================');
    
  } catch (error) {
    console.error('Error creating API key:', error);
  }
};

// Start the script by connecting to the database
connectDB();