import mongoose from 'mongoose'
import { Schema } from "mongoose";

const SalarySchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Employee",
        required: true
    },
    basicpay: {
        type: Number,
        required: true
    },
    bonuses: {
        type: Number,
        required: true
    },
    deductions: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    paymentdate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Delayed", "Paid"]
    }
});

export const Salary = mongoose.model('Salary', SalarySchema)