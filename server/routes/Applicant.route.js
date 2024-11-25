import express from "express"
import { HandleCreateApplicant, HandleAllApplicants, HandleApplicant, HandleUpdateApplicant, HandleDeleteApplicant } from "../controllers/Applicant.controller.js"


const router = express.Router()

router.post("/create-applicant", HandleCreateApplicant)

router.get("/all", HandleAllApplicants)

router.get("/:applicantID", HandleApplicant)

router.patch("/update-applicant", HandleUpdateApplicant)

router.delete("/delete-applicant/:applicantID", HandleDeleteApplicant)

export default router