import { EmployeeLogin } from "../pages/Employees/emplyoeelogin.jsx"
import { EmployeeDashboard } from "../pages/Employees/employeedashboard.jsx"
import { ForgotPassword } from "../pages/Employees/forgotpassword.jsx"
import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
import { ResetPassword } from "../pages/Employees/resetpassword.jsx"
import { EntryPage } from "../pages/Employees/EntryPage.jsx"
import { EmployeeDashboardData } from "../pages/Employees/Dashboard Childs/dashboarddata.jsx"
import { EmployeeSlots } from "../pages/Employees/Dashboard Childs/slots.jsx"
import { EmployeeWorkHours } from "../pages/Employees/Dashboard Childs/workhours.jsx"
import { EmployeeEarnings } from "../pages/Employees/Dashboard Childs/earnings.jsx"
import { EmployeeWellness } from "../pages/Employees/Dashboard Childs/wellness.jsx"
import { EmployeeAwards } from "../pages/Employees/Dashboard Childs/awards.jsx"
// import { VerifyEmailPage } from "../pages/common/verifyemailpage.jsx"

export const EmployeeRoutes = [
    {
        path: "/",
        element: <EntryPage />
    },
    {
        path: "/auth/employee/login",
        element: <EmployeeLogin />
    },
    // {
    //     path: "/auth/employee/verify-email", 
    //     element: <VerifyEmailPage />
    // },
    {
        path: "/auth/employee/employee-dashboard",
        element: <EmployeeDashboard />,
        children: [
            {
                path: "dashboard-data",
                element: <EmployeeDashboardData />
            },
            {
                path: "slots",
                element: <EmployeeSlots />
            },
            {
                path: "work-hours",
                element: <EmployeeWorkHours />
            },
            {
                path: "earnings",
                element: <EmployeeEarnings />
            },
            {
                path: "wellness",
                element: <EmployeeWellness />
            },
            {
                path: "awards",
                element: <EmployeeAwards />
            }
        ]
    },
    {
        path: "/auth/employee/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/auth/employee/reset-email-confirmation",
        element: <ResetEmailConfirm />
    },
    {
        path: "/auth/employee/resetpassword/:token",
        element: <ResetPassword /> 
    },
]

