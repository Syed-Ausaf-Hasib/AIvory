import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import trustRouter from './routes/trustRoutes.js';

const app = express();
await connectCloudinary();

app.use(cors());
app.use(express.json())
app.use(clerkMiddleware())

// Anyone can access
app.get('/', (req, res) => res.send('Server is running!'))

// To fetch the trusted users, we cant send the getUser() token like for the rest of the paths, because we need this data even when we are not logged
// in, so thats why i put this route before the requireAuth() line, so we can make the API calls without the getUser() token
app.use('/api/trust', trustRouter)
// Now after this all the routes are protected
app.use(requireAuth())
//Set base path
app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});