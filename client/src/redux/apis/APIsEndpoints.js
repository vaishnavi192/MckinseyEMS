const APIsEndPoints = {
    LOGIN : "/login",
    CHECKELOGIN : "/check-login",
    FORGOT_PASSWORD : "/forgot-password",
    RESET_PASSWORD : (token) => `/reset-password/${token}`
}

export default APIsEndPoints