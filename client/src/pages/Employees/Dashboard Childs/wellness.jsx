import { useState } from "react"

export const EmployeeWellness = () => {
    const [selectedMetric, setSelectedMetric] = useState("overall")

    // Mock data for wellness metrics
    const wellnessMetrics = {
        overall: 85,
        physical: 80,
        mental: 90,
        social: 85,
    }

    // Mock data for wellness activities
    const wellnessActivities = [
        {
            title: "Yoga Session",
            time: "10:00 AM",
            duration: "1 hour",
            instructor: "Sarah Johnson",
            participants: 12,
        },
        {
            title: "Meditation Workshop",
            time: "2:00 PM",
            duration: "45 mins",
            instructor: "Mike Chen",
            participants: 8,
        },
        {
            title: "Team Sports",
            time: "4:00 PM",
            duration: "1.5 hours",
            instructor: "John David",
            participants: 15,
        },
    ]

    // Mock data for wellness tips
    const wellnessTips = [
        "Take regular breaks every 2 hours",
        "Stay hydrated throughout the day",
        "Practice deep breathing exercises",
        "Maintain good posture while working",
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Wellness Center</h1>

            {/* Wellness Score */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Your Wellness Score</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(wellnessMetrics).map(([metric, score]) => (
                        <div
                            key={metric}
                            onClick={() => setSelectedMetric(metric)}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${
                                selectedMetric === metric
                                    ? "bg-blue-50 border-2 border-blue-500"
                                    : "bg-gray-50 hover:bg-gray-100"
                            }`}
                        >
                            <div className="text-sm text-gray-600 capitalize">{metric}</div>
                            <div className="text-2xl font-bold text-blue-600">{score}%</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Activities */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Upcoming Wellness Activities</h2>
                <div className="space-y-4">
                    {wellnessActivities.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <div className="font-semibold">{activity.title}</div>
                                <div className="text-sm text-gray-600">
                                    {activity.time} • {activity.duration}
                                </div>
                                <div className="text-sm text-gray-500">
                                    Instructor: {activity.instructor}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-600">
                                    {activity.participants} participants
                                </div>
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                                    Join
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Wellness Tips */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Daily Wellness Tips</h2>
                <div className="space-y-3">
                    {wellnessTips.map((tip, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <div className="text-green-500">•</div>
                            <p className="text-gray-700">{tip}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Wellness Resources */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Wellness Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-semibold text-purple-700">Mental Health Support</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Access to professional counseling and mental health resources
                        </p>
                        <button className="mt-2 text-purple-600 hover:text-purple-700">
                            Learn More →
                        </button>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                        <h3 className="font-semibold text-orange-700">Fitness Programs</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Gym memberships and fitness class discounts
                        </p>
                        <button className="mt-2 text-orange-600 hover:text-orange-700">
                            Learn More →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 