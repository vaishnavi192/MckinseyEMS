import express from "express"
import { HandleCreateNotice, HandleAllNotice, HandleNotice, HandleUpdateNotice, HandleDeleteNotice } from "../controllers/Notice.controller.js"

const router = express.Router()


router.post("/create-notice", HandleCreateNotice)

router.get("/all/", HandleAllNotice)

router.get("/:noticeID", HandleNotice)

router.patch("/update-notice", HandleUpdateNotice)

router.delete("/delete-notice/:noticeID", HandleDeleteNotice)


export default router