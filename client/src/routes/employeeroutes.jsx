import { EmployeeLogin } from "../pages/Employees/emplyoeelogin.jsx"
import { EmployeeDashboard } from "../pages/Employees/employeedashboard.jsx"
import { ProtectedRoutes } from "./protectedroutes.jsx"
import { ForgotPassword } from "../pages/Employees/forgotpassword.jsx"
import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
import { ResetPassword } from "../pages/Employees/resetpassword.jsx"
import { useState } from "react"
import { Example } from "../hooks/example.jsx"

export const EmployeeRoutes = [
    {
        path: "/",
        element: <EmployeeLogin />
    },
    {
        path: "/employee-dashboard",
        element: <ProtectedRoutes> <EmployeeDashboard /> </ProtectedRoutes>
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/reset-email-confirmation",
        element: <ResetEmailConfirm />
    },
    {
        path: "/resetpassword/:token",
        element: <ResetPassword />
    },
]

