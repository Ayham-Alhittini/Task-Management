import express from 'express';
import connectDb from './config/DatabaseConfig.js';
import authRoute from './api/v1/routes/AuthRoute.js';
import authenticationMiddleware from './api/v1/middlewares/AuthMiddleware.js';

const app = express();
const PORT = 5000;

app.use(express.json());
connectDb();

app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));

app.use('/auth', authRoute);

app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    res.send('Hello There');
});
