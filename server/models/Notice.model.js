import mongoose from 'mongoose'
import { Schema } from "mongoose";

const NoticeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    audience: {
        type: String,
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Department"
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Employee"
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "HumanResources"
    }
});

export const Notice = mongoose.model("Notice", NoticeSchema)