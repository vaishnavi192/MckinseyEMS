import { useState } from "react"

export const EmployeeSlots = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())

    // Mock data for available slots
    const availableSlots = [
        { id: 1, time: "09:00 AM", duration: "1 hour", type: "Meeting Room A" },
        { id: 2, time: "10:30 AM", duration: "30 mins", type: "Conference Room B" },
        { id: 3, time: "02:00 PM", duration: "1 hour", type: "Meeting Room A" },
        { id: 4, time: "03:30 PM", duration: "45 mins", type: "Conference Room B" },
    ]

    // Mock data for booked slots
    const bookedSlots = [
        { id: 1, time: "11:00 AM", duration: "1 hour", type: "Meeting Room A", date: "2024-03-20" },
        { id: 2, time: "01:00 PM", duration: "30 mins", type: "Conference Room B", date: "2024-03-20" },
    ]

    return (
        <div className="w-full h-full overflow-x-hidden">
            <div className="w-full px-4">
                <h1 className="text-2xl font-bold mb-4">Slot Management</h1>

                {/* Date Selector */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">Select Date</h2>
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                            className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Available Slots */}
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-bold mb-3">Available Slots</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {availableSlots.map((slot) => (
                            <div key={slot.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold">{slot.time}</p>
                                        <p className="text-sm text-gray-500">{slot.duration}</p>
                                    </div>
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                        Available
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{slot.type}</p>
                                <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                    Book Slot
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Booked Slots */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-3">Your Booked Slots</h2>
                    <div className="space-y-3">
                        {bookedSlots.map((slot) => (
                            <div key={slot.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div>
                                    <p className="font-semibold">{slot.time}</p>
                                    <p className="text-sm text-gray-500">{slot.type} - {slot.duration}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        Booked
                                    </span>
                                    <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 