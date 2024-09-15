import express from 'express'
import { config } from 'dotenv'
import { initiateApp } from './src/initiate-app.js'
import path from 'path';
import { fileURLToPath } from 'url';



config({ path: './config/dev.config.env' })



const app = express()

// Get the filename and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
initiateApp(express,app)