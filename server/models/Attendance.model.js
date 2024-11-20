import mongoose from 'mongoose'
import { Schema } from "mongoose";


const AttendanceSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Employee"
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Present", "Absent"],
    }
});

export const Attendance = mongoose.model("Attendance", AttendanceSchema)