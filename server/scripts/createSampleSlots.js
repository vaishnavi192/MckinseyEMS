// Script to add sample slots to the database
import mongoose from 'mongoose';
import Slot from '../models/Slot.model.js';

// MongoDB connection string - update this to match your database
const MONGODB_URI = 'mongodb://localhost:27017/employeeManagement'; // Update this if different

async function createSampleSlots() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Sample slots data
        const sampleSlots = [
            {
                name: "Morning Security Guard",
                date: new Date("2025-06-07"),
                startTime: "06:00",
                endTime: "14:00",
                facility: "Main Campus",
                dept: "Security",
                designation: "Security Guard",
                type: "Regular Shift",
                compensation: 800,
                status: "available"
            },
            {
                name: "Afternoon Receptionist",
                date: new Date("2025-06-07"),
                startTime: "12:00",
                endTime: "20:00",
                facility: "Main Campus",
                dept: "Administration",
                designation: "Receptionist",
                type: "Regular Shift",
                compensation: 600,
                status: "available"
            },
            {
                name: "Night Cleaner",
                date: new Date("2025-06-07"),
                startTime: "22:00",
                endTime: "06:00",
                facility: "Main Campus",
                dept: "Housekeeping",
                designation: "Cleaner",
                type: "Night Shift",
                compensation: 750,
                status: "available"
            },
            {
                name: "Weekend IT Support",
                date: new Date("2025-06-08"),
                startTime: "09:00",
                endTime: "17:00",
                facility: "IT Center",
                dept: "Information Technology",
                designation: "IT Support",
                type: "Weekend Support",
                compensation: 1200,
                status: "available"
            },
            {
                name: "Event Management Assistant",
                date: new Date("2025-06-08"),
                startTime: "10:00",
                endTime: "18:00",
                facility: "Conference Hall",
                dept: "Events",
                designation: "Event Assistant",
                type: "Event Support",
                compensation: 900,
                status: "available"
            },
            {
                name: "Library Assistant",
                date: new Date("2025-06-09"),
                startTime: "08:00",
                endTime: "16:00",
                facility: "Main Campus",
                dept: "Library",
                designation: "Library Assistant",
                type: "Regular Shift",
                compensation: 650,
                status: "available"
            }
        ];

        // Clear existing slots (optional)
        await Slot.deleteMany({});
        console.log('Cleared existing slots');

        // Insert sample slots
        const insertedSlots = await Slot.insertMany(sampleSlots);
        console.log(`Created ${insertedSlots.length} sample slots:`);
        
        insertedSlots.forEach((slot, index) => {
            console.log(`${index + 1}. ${slot.name} - ${slot.startTime} to ${slot.endTime} on ${slot.date.toDateString()}`);
        });

        console.log('\nSample slots created successfully!');
        
    } catch (error) {
        console.error('Error creating sample slots:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

// Run the script
createSampleSlots();
