import { useState } from "react"

export const EmployeeWorkHours = () => {
    const [isTracking, setIsTracking] = useState(false)
    const [startTime, setStartTime] = useState(null)

    // Mock data for weekly hours
    const weeklyHours = [
        { day: "Monday", hours: 8, status: "Completed" },
        { day: "Tuesday", hours: 7.5, status: "Completed" },
        { day: "Wednesday", hours: 8, status: "Completed" },
        { day: "Thursday", hours: 6, status: "In Progress" },
        { day: "Friday", hours: 0, status: "Not Started" },
        { day: "Saturday", hours: 0, status: "Weekend" },
        { day: "Sunday", hours: 0, status: "Weekend" },
    ]

    const handleStartTracking = () => {
        setIsTracking(true)
        setStartTime(new Date())
    }

    const handleStopTracking = () => {
        setIsTracking(false)
        setStartTime(null)
    }

    return (
        <div className="w-full space-y-4">
            <h1 className="text-2xl font-bold">Work Hours Tracking</h1>

            {/* Time Tracking Card */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-3">Today's Work Hours</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-2xl font-bold text-blue-600">
                            {isTracking ? "Tracking..." : "0:00"}
                        </div>
                        <div className="text-sm text-gray-500">
                            {isTracking ? "Started at " + startTime?.toLocaleTimeString() : "Not tracking"}
                        </div>
                    </div>
                    <button
                        onClick={isTracking ? handleStopTracking : handleStartTracking}
                        className={`px-4 py-2 rounded-lg text-white font-semibold ${
                            isTracking ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {isTracking ? "Stop Tracking" : "Start Tracking"}
                    </button>
                </div>
            </div>

            {/* Weekly Summary */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-3">Weekly Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
                    {weeklyHours.map((day) => (
                        <div key={day.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <div className="font-semibold">{day.day}</div>
                                <div className="text-sm text-gray-500">{day.status}</div>
                            </div>
                            <div className="text-lg font-bold text-blue-600">{day.hours}h</div>
                        </div>
                    ))}
                </div>
                <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-center">
                        <div className="font-semibold">Total Hours This Week</div>
                        <div className="text-xl font-bold text-green-600">
                            {weeklyHours.reduce((sum, day) => sum + day.hours, 0)}h
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-3">Recent Activity</h2>
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border-b last:border-b-0">
                        <div>
                            <p className="font-semibold">Work Session</p>
                            <p className="text-sm text-gray-500">8 hours logged</p>
                        </div>
                        <span className="text-sm text-gray-500">Yesterday</span>
                    </div>
                    <div className="flex items-center justify-between p-2 border-b last:border-b-0">
                        <div>
                            <p className="font-semibold">Work Session</p>
                            <p className="text-sm text-gray-500">7.5 hours logged</p>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2">
                        <div>
                            <p className="font-semibold">Work Session</p>
                            <p className="text-sm text-gray-500">8 hours logged</p>
                        </div>
                        <span className="text-sm text-gray-500">3 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    )
} 