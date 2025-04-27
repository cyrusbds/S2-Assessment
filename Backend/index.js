import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
dotenv.config(); 


const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
    origin: 'https://news-piece.netlify.app/',
  }));

app.use(express.json());
app.use('/api/user', userRoutes)

const dbURI = process.env.DB_URI;
// const dbURI = "mongodb://localhost:27017"

const connectDB = async () => {
    try {
        if (!dbURI) {
            console.error('DB_URI is not defined in .env file');
            return;
        }
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
