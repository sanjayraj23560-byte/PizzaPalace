// server.js

import express from 'express';
import DataBase from './DB.js';
import cors from 'cors';
import router from '../routers/index.js';

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://pizza-palace-lac.vercel.app", // Stripped trailing paths like /pizza
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin or matching your main domain or ANY Vercel deployment preview URL
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            origin.endsWith(".vercel.app") // Automatically allows preview branch URLs
        ) {
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



