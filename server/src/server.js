import express, { json } from 'express';
import DataBase from './DB.js';
import cors from 'cors';

const app = express();
const PORT = 6000;

app.use(cors());
DataBase();

app.use(express(json()));
app.listen(PORT,()=>{
    console.log(`Sever started on port ${PORT}`)
});