import express from "express"
import { HandleHRDashboard } from "../controllers/Dashboard.controller.js"

const router = express.Router()

router.get("/HR-dashboard", HandleHRDashboard)

export default router