import mongoose from 'mongoose'
import { Schema } from "mongoose";


const InterviewinsightSchema = new Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Applicant"
    },
    feedback: {
        type: String,
        required: true
    },
    interviewer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "HumanResources"
    },
    interviewdate: {
        type: Date,
        required: true
    },
    responsedate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Canceled", "Completed"],
    }
});

export const Interviewinsight = mongoose.model("Interviewinsight", InterviewinsightSchema)