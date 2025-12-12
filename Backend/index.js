import express, { urlencoded } from 'express'
import route from './routes/route.js'
import dbConnection from './dbConnection/dbConnection.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path'
import cors from 'cors'

dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser());  
app.use(cors({
    origin: 'http://localhost:5173',
    
    credentials: true
    
}))
app.use('/uploads',express.static(path.join("dist","uploads")))
app.use('/kycupload',express.static(path.join("dist","kycupload")))
app.use(route);
const PORT=9090;
dbConnection();
app.listen(PORT,()=>{
    console.log("port is running in the 9090")
});