import express from 'express';
import connectDb from './config/DatabaseConfig.js';
import mongoose from 'mongoose';

const app = express();
const PORT = 5000;

app.use(express.json());
connectDb();

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));

// Test connect to database

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

const user = new User({ username: 'Ayham', password: 'Fx90330#' });

user.save();
