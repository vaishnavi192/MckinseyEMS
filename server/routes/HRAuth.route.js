import express from 'express'
import { HandleHRSignup, HandleHRVerifyEmail, HandleHRResetverifyEmail, HandleHRLogin, HandleHRCheck, HandleHRLogout, HandleHRForgotPassword, HandleHRResetPassword } from '../controllers/HR.controller.js'
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'

const router = express.Router()

router.post("/signup", HandleHRSignup)

router.post("/verify-email", HandleHRVerifyEmail)

router.post("/resend-verify-email", HandleHRResetverifyEmail)

router.post("/login", HandleHRLogin)

router.get("/check-login", VerifyhHRToken, HandleHRCheck) 

router.post("/logout", HandleHRLogout)

router.post("/forgot-password", HandleHRForgotPassword)

router.post("/reset-password/:token", HandleHRResetPassword)


export default router