import express from 'express';
import DataBase from './DB.js';
import cors from 'cors';
import router from '../routers/index.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all incoming request origins dynamically
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Express json parser
app.use(express.json());

DataBase();

app.use('/api', router);

app.get('/', (req, res) => {
    res.send("Server is running 🖥️");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});