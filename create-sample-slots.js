// Sample script to create slots for testing
// This can be run via API or directly in the database

const sampleSlots = [
    {
        title: "Morning Security Shift",
        description: "Main entrance security monitoring",
        facility: "Main Building",
        requiredDesignation: "Security Guard",
        date: new Date("2024-01-15"),
        startTime: "08:00",
        endTime: "16:00",
        hourlyRate: 25,
        maxParticipants: 2,
        status: "open"
    },
    {
        title: "Evening Cleaning Shift",
        description: "Office cleaning and maintenance",
        facility: "Main Building", 
        requiredDesignation: "Cleaner",
        date: new Date("2024-01-15"),
        startTime: "18:00",
        endTime: "22:00",
        hourlyRate: 20,
        maxParticipants: 3,
        status: "open"
    },
    {
        title: "Night Security Patrol",
        description: "Perimeter security patrol",
        facility: "Main Building",
        requiredDesignation: "Security Guard", 
        date: new Date("2024-01-16"),
        startTime: "22:00",
        endTime: "06:00",
        hourlyRate: 30,
        maxParticipants: 1,
        status: "open"
    },
    {
        title: "IT Support Morning",
        description: "Technical support and maintenance",
        facility: "IT Department",
        requiredDesignation: "IT Support",
        date: new Date("2024-01-16"),
        startTime: "09:00", 
        endTime: "17:00",
        hourlyRate: 35,
        maxParticipants: 2,
        status: "open"
    },
    {
        title: "Kitchen Helper Evening", 
        description: "Food preparation and service",
        facility: "Cafeteria",
        requiredDesignation: "Kitchen Helper",
        date: new Date("2024-01-17"),
        startTime: "17:00",
        endTime: "21:00", 
        hourlyRate: 18,
        maxParticipants: 4,
        status: "open"
    },
    {
        title: "Warehouse Operations",
        description: "Inventory management and logistics",
        facility: "Warehouse",
        requiredDesignation: "Warehouse Worker",
        date: new Date("2024-01-17"),
        startTime: "10:00",
        endTime: "18:00",
        hourlyRate: 22,
        maxParticipants: 3,
        status: "open"
    }
];

console.log("Sample slots to create:");
console.log(JSON.stringify({ slots: sampleSlots }, null, 2));
