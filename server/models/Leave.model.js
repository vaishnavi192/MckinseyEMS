import mongoose from 'mongoose'
import { Schema } from "mongoose";

const LeaveSchema = new Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : "Employee"
  },
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Rejected", "Approved"],
    default : "Pending"
  },
  approvedby: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : "HumanResources"
  }
});

export const Leave = mongoose.model("Leave", LeaveSchema)