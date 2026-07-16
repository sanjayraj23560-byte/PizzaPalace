import express, { json } from 'express';
import DataBase from './DB.js';
import cors from 'cors';
import router from '../Routers/index.js';

const app = express();
const PORT = 4000;

app.use(cors());
DataBase();

app.use('/api', router)

app.get('/', (req, res) => {
    res.send("Server is runnig 🖥️")
})

app.use(express(json()));
app.listen(PORT, () => {
    console.log(`Sever started on port ${PORT}`)
});