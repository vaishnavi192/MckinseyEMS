import express from 'express'
import { HandleEmplyoeeSignup, HandleEmplyoeeVerifyEmail, HandleEmplyoeeLogout, HandleEmplyoeeLogin, HandleEmplyoeeForgotPassword, HandleEmplyoeeSetPassword, HandleResetEmplyoeeVerifyEmail, HandleEmployeeCheck } from '../controllers/Emplyoee.controller.js'
import { VerifyEmployeeToken } from '../middlewares/Auth.middleware.js'

const router = express.Router()

router.post("/signup", HandleEmplyoeeSignup)

router.post("/verify-email", HandleEmplyoeeVerifyEmail)

router.post("/resend-verify-email", HandleResetEmplyoeeVerifyEmail)

router.post("/login", HandleEmplyoeeLogin)

router.get("/check-login", VerifyEmployeeToken, HandleEmployeeCheck)

router.post("/logout", HandleEmplyoeeLogout)

router.post("/forgot-password", HandleEmplyoeeForgotPassword)

router.post("/reset-password/:token", HandleEmplyoeeSetPassword)


export default router