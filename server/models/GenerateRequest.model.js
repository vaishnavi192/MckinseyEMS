import mongoose from 'mongoose'
import { Schema } from "mongoose";

const GenerateRequestSchema = new Schema({
    requesttitle: {
        type: String,
        required: true
    },
    requestconent: {
        type: String,
        required: true
    },
    referredto: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Employee"
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Department"
    }
});

export const GenerateRequest = mongoose.model("GenerateRequest", GenerateRequestSchema)