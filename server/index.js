import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import EmployeeAuthRouter from './routes/EmployeeAuth.route.js'
import HRrouter from './routes/HRAuth.route.js'
import DashboardRouter from './routes/Dashbaord.route.js'
import EmployeeRouter from './routes/Employee.route.js'
import DepartmentRouter from './routes/Department.route.js'
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

app.use("/api/auth/employee", EmployeeAuthRouter)

app.use("/api/auth/HR", HRrouter)

app.use("/api/v1/dashboard", DashboardRouter)

app.use("/api/v1/employee", EmployeeRouter)

app.use("/api/v1/department", DepartmentRouter)


app.listen(process.env.PORT, async () => {
  await ConnectDB()
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})