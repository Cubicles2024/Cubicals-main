import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Configure dotenv with proper path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Function to display the API key
const displayApiKey = () => {
  try {
    // Fetch the API key from environment variables
    const apiKey = process.env.B2B_API_KEY;
    
    console.log('\n===============================');
    console.log('B2B API KEY INFORMATION');
    console.log('===============================');
    
    if (!apiKey) {
      console.error('Error: B2B_API_KEY is not defined in your .env file');
      console.log('Please add B2B_API_KEY to your .env file');
    } else {
      console.log(`B2B API Key: ${apiKey}`);
    }
    
    console.log('===============================');
    
  } catch (error) {
    console.error('Error retrieving API key:', error);
  }
};

// Execute immediately
displayApiKey();