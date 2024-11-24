import mongoose from 'mongoose'
import { Schema } from "mongoose";

const DepartmentSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    employees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        }
    ],
    HumanResources: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "HumanResources"
        }
    ],
});

export const Department = mongoose.model("Department", DepartmentSchema)