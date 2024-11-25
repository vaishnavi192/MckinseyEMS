import express from 'express'
import { HandleCreateRecruitment, HandleAllRecruitments, HandleRecruitment, HandleUpdateRecruitment, HandleDeleteRecruitment } from '../controllers/Recruitment.controller.js'

const router = express.Router()

router.post("/create-recruitment", HandleCreateRecruitment)

router.get("/all", HandleAllRecruitments)

router.get("/:recruitmentID", HandleRecruitment)

router.patch("/update-recruitment", HandleUpdateRecruitment)

router.delete("/delete-recruitment/:recruitmentID", HandleDeleteRecruitment)

export default router