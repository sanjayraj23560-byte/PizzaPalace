import express from 'express';
import DataBase from './DB.js';
import cors from 'cors';
import router from '../routers/index.js';

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        // Add your deployed Vercel domain below (WITHOUT trailing slashes)
        "https://pizza-palace-rd281jq81-sanjayraj23560-bytes-projects.vercel.app",
        // If you have a custom or shorter Vercel production URL, add it too:
        "https://pizza-palace.vercel.app"
    ],
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