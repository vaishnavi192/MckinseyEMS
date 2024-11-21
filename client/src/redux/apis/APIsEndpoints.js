export const APIsEndPoints = {
    LOGIN: "/api/auth/employee/login",
    CHECKELOGIN: "/api/auth/employee/check-login",
    FORGOT_PASSWORD: "/api/auth/employee/forgot-password",
    RESET_PASSWORD: (token) => `/api/auth/employee/reset-password/${token}` 
}

export const HREndPoints = {
    SIGNUP : "/api/auth/HR/signup",
    CHECKLOGIN : "/api/auth/HR/check-login"
}
