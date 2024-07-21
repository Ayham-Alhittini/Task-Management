import express from 'express';
import connectDb from './config/DatabaseConfig.js';
import authRoute from './api/v1/routes/AuthRoute.js';
import errorHandler from './api/v1/middlewares/errorHandler.js';
import authenticationMiddleware from './api/v1/middlewares/AuthMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Connect to the database
connectDb();

// Authentication Routes
app.use('/auth', authRoute);

// Authentication Middleware
app.use(authenticationMiddleware);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
