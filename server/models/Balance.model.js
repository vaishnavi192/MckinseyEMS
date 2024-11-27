import mongoose from "mongoose";
import { Schema } from "mongoose";

const BalanceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availableamount: {
        type: Number,
        required: true
    },
    totalexpenses: {
        type: Number,
        required: true
    },
    expensemonth: {
        type: String,
        required: true
    },
    submitdate: {
        type: Date,
        default: new Date()
    },
    organizationID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }
},
{
    timestamps: true
})