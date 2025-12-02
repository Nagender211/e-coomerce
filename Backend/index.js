import express, { urlencoded } from 'express'
import route from './routes/route.js'
import dbConnection from './dbConnection/dbConnection.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser());  

app.use(route);
const PORT=9090;
dbConnection();
app.listen(PORT,()=>{
    console.log("port is running in the 9090")
});