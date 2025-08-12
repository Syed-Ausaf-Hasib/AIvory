import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';

const app = express();
await connectCloudinary();

app.use(cors());
app.use(express.json())
app.use(clerkMiddleware())

// Anyone can access
app.get('/', (req, res) => res.send('Server is running!'))

// Now after this all the routes are protected
app.use(requireAuth())
//Set base path as /api/ai
app.use('/api/ai', aiRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});