import express from 'express'
import { HandleAllInterviews, HandleCreateInterview, HandleInterview, HandleUpdateInterview, HandleDeleteInterview } from '../controllers/InterviewInsights.controller.js'
const router = express.Router()

router.post("/create-interview", HandleCreateInterview)

router.get("/all", HandleAllInterviews)

router.get("/:interviewID", HandleInterview)

router.patch("/update-interview", HandleUpdateInterview)

router.delete("/delete-interview/:interviewID", HandleDeleteInterview)


export default router