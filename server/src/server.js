import express from 'express';
import DataBase from './DB.js';
import cors from 'cors';
import router from '../routers/index.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like Postman or server-to-server calls)
        if (!origin) return callback(null, true);
        
        // Match any .vercel.app deployment or localhost
        if (origin.endsWith('.vercel.app') || origin.includes('localhost')) {
            return callback(null, true);
        }
        
        // Reject cleanly without throwing a 500 error
        return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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