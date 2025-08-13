import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import Authrouter from './Routes/authRoutes.js';
import TaskRouter from './Routes/taskRoutes.js';
import connectDB from './config/dbconfig.js';
config();
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
 app.use(cors())
 app.use(express.json())

// // Routes
app.use('/api/auth', Authrouter)
app.use('/api/tasks',TaskRouter )

// // Connect DB & Start Server
connectDB()
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});