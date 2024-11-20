import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import EmployeeRouter from './routes/EmployeeAuth.route.js'
import { ConnectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from "cors"


dotenv.config()
const app = express();
app.use(bodyParser.json())
app.use(cookieParser())


app.use(cors({
    origin: process.env.CLIENT_URL, // Adjust this to match your front-end origin exactly
    credentials: true, // This is optional and depends on whether you’re using cookies
  }));
// app.options('*', cors())

app.use("/api/auth/employee", EmployeeRouter)


app.listen(process.env.PORT, async ()=>{
    await ConnectDB()
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})