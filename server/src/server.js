// server.js

import express from 'express';
import DataBase from './DB.js';
import cors from 'cors';
import router from '../routers/index.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Update allowed origins
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://pizza-palace-lac.vercel.app/pizza" // 👈 Add your exact Vercel URL here
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl) or if origin is in whitelist
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());

DataBase();

app.use('/api', router);

app.get('/', (req, res) => {
    res.send("Server is running 🖥️");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});