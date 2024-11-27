import express from 'express'
import { HandleAllEvents, HandleCreateEvent, HandleDeleteEvent, HandleEvent, HandleUpdateEvent } from '../controllers/CorporateCalendar.controller.js'
const router = express.Router()

router.post("/create-event", HandleCreateEvent)

router.get("/all", HandleAllEvents)

router.get("/:eventID", HandleEvent)

router.patch("/update-event", HandleUpdateEvent)

router.delete("/delete-event/:eventID", HandleDeleteEvent)

export default router