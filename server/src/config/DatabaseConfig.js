import mongoose from 'mongoose';
import 'dotenv/config';

export default async function connectDb() {
    await mongoose.connect(process.env.DATABASE_URL);
}
