import mongoose from 'mongoose';
import { Slot } from '../models/Slot.model.js';

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/EMS', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const createTestSlots = async () => {
    try {
        // Clear existing slots
        await Slot.deleteMany({});
        
        const testSlots = [
            {
                name: "Morning Security Shift",
                facility: "Main Building",
                dept: "Security",
                date: new Date('2025-06-07'),
                startTime: "09:00",
                endTime: "17:00",
                type: "regular",
                compensation: 800,
                status: "open",
                createdBy: new mongoose.Types.ObjectId()
            },
            {
                name: "Evening Cleaning",
                facility: "Main Building", 
                dept: "Maintenance",
                date: new Date('2025-06-07'),
                startTime: "18:00",
                endTime: "22:00",
                type: "regular",
                compensation: 600,
                status: "open",
                createdBy: new mongoose.Types.ObjectId()
            },
            {
                name: "IT Support Weekend",
                facility: "Tech Center",
                dept: "IT",
                date: new Date('2025-06-08'),
                startTime: "10:00",
                endTime: "16:00",
                type: "overtime",
                compensation: 1200,
                status: "open",
                createdBy: new mongoose.Types.ObjectId()
            },
            {
                name: "Kitchen Help",
                facility: "Cafeteria",
                dept: "Food Service",
                date: new Date('2025-06-09'),
                startTime: "07:00",
                endTime: "15:00",
                type: "regular",
                compensation: 700,
                status: "open",
                createdBy: new mongoose.Types.ObjectId()
            }
        ];
        
        const createdSlots = await Slot.insertMany(testSlots);
        console.log(`✅ Created ${createdSlots.length} test slots successfully!`);
        
        // Display created slots
        createdSlots.forEach((slot, index) => {
            console.log(`${index + 1}. ${slot.name} - ${slot.facility} (${slot.startTime}-${slot.endTime}) - ₹${slot.compensation}`);
        });
        
    } catch (error) {
        console.error('❌ Error creating test slots:', error);
    } finally {
        mongoose.connection.close();
    }
};

createTestSlots();
