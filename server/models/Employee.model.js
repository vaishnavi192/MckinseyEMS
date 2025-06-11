import mongoose from 'mongoose';
import { Schema } from "mongoose";

const EmployeeSchema = new Schema({    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 6
    },
    designation: {
        type: String,
        trim: true
    },
    jobType: {
        type: String,
        enum: {
            values: ["employee", "contractual worker"],
            message: '{VALUE} is not a valid job type'
        }
    },
    facility: {
        type: String,
        enum: {
            values: ["MC 1", "MC 2", "MC 3", "MC 4"],
            message: '{VALUE} is not a valid facility'
        }
    },
    dept: {
        type: String,
        trim: true
    },
    // Statistics
    numberOfHours: {
        type: Number,
        default: 0,
        min: 0
    },
    totalEarnings: {
        type: Number,
        default: 0,
        min: 0
    },
    earningsThisMonth: {
        type: Number,
        default: 0,
        min: 0
    },
    totalNumberOfSlots: {
        type: Number,
        default: 0,
        min: 0
    },
    slotsActive: {
        type: Number,
        default: 0,
        min: 0
    },
    // Detailed statistics
    totalShiftsDone: {
        type: Number,
        default: 0,
        min: 0
    },
    shiftsThisMonth: {
        type: Number,
        default: 0,
        min: 0
    },
    totalOvertimeHours: {
        type: Number,
        default: 0,
        min: 0
    },
    totalTrainingHours: {
        type: Number,
        default: 0,
        min: 0
    },
    totalContractualHours: {
        type: Number,
        default: 0,
        min: 0
    },
    // Booked slots references
    bookedSlots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot'
    }],
    completedSlots: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot'
    }]
}, {
    timestamps: true
});

// Method to update employee stats when slot is completed
EmployeeSchema.methods.updateStatsOnSlotCompletion = function(slot) {
    const slotDuration = this.calculateSlotDuration(slot.startTime, slot.endTime);
    
    // Update total hours and earnings
    this.numberOfHours += slotDuration;
    this.totalEarnings += slot.compensation;
    
    // Update monthly earnings (you might want to add date checking logic)
    const currentMonth = new Date().getMonth();
    const slotMonth = new Date(slot.date).getMonth();
    if (currentMonth === slotMonth) {
        this.earningsThisMonth += slot.compensation;
        this.shiftsThisMonth += 1;
    }
    
    // Update shift counts
    this.totalShiftsDone += 1;
    this.totalNumberOfSlots += 1;
    
    // Update specific type hours
    switch(slot.type) {
        case 'overtime':
            this.totalOvertimeHours += slotDuration;
            break;
        case 'training':
            this.totalTrainingHours += slotDuration;
            break;
        case 'contractual':
            this.totalContractualHours += slotDuration;
            break;
    }
    
    // Move slot from booked to completed
    this.bookedSlots.pull(slot._id);
    this.completedSlots.push(slot._id);
    this.slotsActive -= 1;
};

// Helper method to calculate slot duration in hours
EmployeeSchema.methods.calculateSlotDuration = function(startTime, endTime) {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    
    const startTotalMin = startHour * 60 + startMin;
    const endTotalMin = endHour * 60 + endMin;
    
    return (endTotalMin - startTotalMin) / 60; // Return hours
};

export const Employee = mongoose.model('Employee', EmployeeSchema);