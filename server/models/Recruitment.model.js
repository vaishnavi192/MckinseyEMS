import mongoose from 'mongoose'
import { Schema } from "mongoose";

const RecruitmentSchema = new Schema({
    jobtitle: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Department"
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Applicant"
        }
    ],
    status: {
        type: String,
        required: true,
        enum: ['Conduct-Interview', 'Rejected', 'Pending']
    }
});

export const Recruitment = mongoose.model('Recruitment', RecruitmentSchema)