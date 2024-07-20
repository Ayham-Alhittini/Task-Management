import express from 'express';
import connectDb from './config/DatabaseConfig.js';
import authRoute from './api/v1/routes/AuthRoute.js';

const app = express();
const PORT = 5000;

app.use(express.json());
connectDb();

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));

app.use('/auth', authRoute);