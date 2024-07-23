import app from './app.js';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
