import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import EmployeeAuthRouter from './routes/EmployeeAuth.route.js'
import HRAuthrouter from './routes/HRAuth.route.js'
import DashboardRouter from './routes/Dashbaord.route.js'
import EmployeeRouter from './routes/Employee.route.js'
import HRRouter from './routes/HR.route.js'
import DepartmentRouter from './routes/Department.route.js'
import SalaryRouter from './routes/Salary.route.js'
import NoticeRouter from "./routes/Notice.route.js"
import LeaveRouter from './routes/Leave.route.js'
import AttendanceRouter from './routes/Attendance.route.js'
import RecruitmentRouter from './routes/Recuritment.route.js'
import ApplicantRouter from './routes/Applicant.route.js'
import GenerateRequestRouter from './routes/GenerateRequest.route.js'
import CorporateCalendarRouter from './routes/CorporateCalendar.route.js'
import BalanceRouter from './routes/Balance.route.js'
import SlotRouter from './routes/slot.routes.js'
import OccupancyRouter from './routes/Occupancy.route.js'
import AttendancePayrollRouter from './routes/AttendancePayroll.route.js'
import DevAuthRouter from './routes/DevAuth.route.js'
import { ConnectDB } from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from "cors"


dotenv.config()
const app = express();
app.use(bodyParser.json())
app.use(cookieParser())


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
}));
// app.options('*', cors())


app.use("/api/auth/employee", EmployeeAuthRouter) 

app.use("/api/auth/HR", HRAuthrouter)

app.use("/api/v1/dashboard", DashboardRouter) 

app.use("/api/v1/employee", EmployeeRouter)

app.use("/api/v1/HR", HRRouter)

app.use("/api/v1/department", DepartmentRouter)

app.use("/api/v1/salary", SalaryRouter)

app.use("/api/v1/notice", NoticeRouter)

app.use("/api/v1/leave", LeaveRouter)

app.use("/api/v1/attendance", AttendanceRouter)

app.use("/api/v1/recruitment", RecruitmentRouter)

app.use("/api/v1/applicant", ApplicantRouter)

app.use("/api/v1/generate-request", GenerateRequestRouter)

app.use("/api/v1/corporate-calendar", CorporateCalendarRouter)

app.use("/api/v1/balance", BalanceRouter)

app.use("/api/v1/slots", SlotRouter)

app.use("/api/occupancy", OccupancyRouter)

app.use("/api/attendance-payroll", AttendancePayrollRouter)

app.use("/api/dev", DevAuthRouter)

app.listen(process.env.PORT, async () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
  
  try {
    const dbResult = await ConnectDB()
    
    if (dbResult.success) {
      console.log(`✅ MongoDB connected successfully`)
      console.log(`🚀 All features available`)
    } else {
      console.log(`⚠️  MongoDB connection failed: ${dbResult.error}`)
      console.log(`🔧 Running in DEVELOPMENT MODE`)
      console.log(`📝 Available development endpoints:`)
      console.log(`   - Employee Login: POST /api/dev/employee/dev-login`)
      console.log(`   - HR Login: POST /api/dev/hr/dev-login`)
      console.log(`   - Available Slots: GET /api/dev/slots/available`)
      console.log(`   - Booked Slots: GET /api/dev/slots/booked`)
      console.log(`   - Completed Slots: GET /api/dev/slots/completed`)
      console.log(`   - Book Slot: POST /api/dev/slots/book/:slotId`)
      console.log(`   - Complete Slot: POST /api/dev/slots/complete/:slotId`)
      console.log(`📋 To fix MongoDB: Update IP whitelist in MongoDB Atlas`)
    }
  } catch (error) {
    console.log(`⚠️  MongoDB connection failed: ${error.message}`)
    console.log(`🔧 Server running in development mode with hardcoded data`)
  }
})