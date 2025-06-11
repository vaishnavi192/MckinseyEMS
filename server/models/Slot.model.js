import mongoose from 'mongoose';
import { Schema } from "mongoose";

const SlotSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Slot name is required'],
        trim: true
    },
    facility: {
        type: String,
        required: [true, 'Facility name is required'],
        trim: true
    },    dept: {
        type: String,
        required: [true, 'Department name is required'],
        trim: true
    },
    requiredDesignation: {
        type: String,
        required: false,
        trim: true,
        default: null
    },date: {
        type: Date,
        required: [true, 'Date is required']
    },
    startTime: {
        type: String,
        required: [true, 'Start time is required'],
        validate: {
            validator: function(time) {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
            },
            message: 'Invalid time format (HH:MM)'
        }
    },
    endTime: {
        type: String,
        required: [true, 'End time is required'],
        validate: {
            validator: function(time) {
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
            },
            message: 'Invalid time format (HH:MM)'
        }
    },    type: {
        type: String,
        enum: {
            values: ["regular", "overtime", "contractual", "training"],
            message: '{VALUE} is not a valid slot type'
        },
        default: "regular"
    },
    compensation: {
        type: Number,
        default: 0,
        min: [0, 'Compensation cannot be negative']
    },
    status: {
        type: String,
        enum: {
            values: ["open", "booked", "cancelled"],
            message: '{VALUE} is not a valid status'
        },
        default: "open"
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HumanResources',
        required: [true, 'Creator reference is required']
    }
}, {
    timestamps: true
});

// Add index for better query performance
SlotSchema.index({ date: 1, facility: 1, dept: 1 });

// Add method to check if slot is available
SlotSchema.methods.isAvailable = function() {
    return this.status === 'open';
};

// Add method to check if slot is in the past
SlotSchema.methods.isPast = function() {
    return this.date < new Date();
};

export const Slot = mongoose.model('Slot', SlotSchema); 