import express from 'express';

const app = express();
const PORT = 5000;

app.use(express.json());
app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
