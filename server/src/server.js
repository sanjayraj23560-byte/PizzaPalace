import express from 'express'; // 💡 Cleaned up the import
import DataBase from './DB.js';
import cors from 'cors';
import router from '../Routers/index.js';

const app = express();
const PORT = 4000;

// 1. Enable CORS first
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

DataBase();

app.use('/api', router);

app.get('/', (req, res) => {
    res.send("Server is running 🖥️")
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});