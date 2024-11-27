import express from 'express'
import { HandleAllGenerateRequest, HandleCreateGenerateRequest, HandleDeleteRequest, HandleGenerateRequest, HandleUpdateRequestByEmployee, HandleUpdateRequestByHR } from '../controllers/GenerateRequest.controller.js'

const router = express.Router()


router.post("/create-request", HandleCreateGenerateRequest)

router.get("/all", HandleAllGenerateRequest)

router.get("/:requestID", HandleGenerateRequest)

router.patch("/update-request-content", HandleUpdateRequestByEmployee)

router.patch("/update-request-status", HandleUpdateRequestByHR)

router.delete("/delete-request/:requestID", HandleDeleteRequest)

export default router



