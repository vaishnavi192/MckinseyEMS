import { useSelector } from "react-redux"

export const EmployeeDashboardData = () => {
    const employeeState = useSelector(state => state.employee)
    const employeeName = employeeState?.employee?.basicDetails?.name || "Dr. Raghvendra"

    // Mock data for summary cards
    const summaryData = [
        { title: "Work Hours", value: "40", unit: "h", period: "this week", color: "blue" },
        { title: "Earnings", value: "$2,500", unit: "", period: "this month", color: "green" },
        { title: "Booked Slots", value: "5", unit: "", period: "this week", color: "purple" },
        { title: "Wellness Score", value: "85", unit: "%", period: "", color: "yellow" },
    ]

    // Mock data for recent activity
    const recentActivity = [
        { description: "Booked a slot for Meeting Room A - 2:00 PM", time: "2 hours ago" },
        { description: "Updated work hours: 8 hours logged", time: "Yesterday" },
        { description: "Received award: Employee of the Month", time: "3 days ago" },
    ]

    return (
        <div className="w-full px-4 py-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {employeeName}!</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryData.map((item, index) => (
                    <div key={index} className={`bg-white p-6 rounded-lg shadow-md border border-${item.color}-200`}>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{item.title}</h3>
                        <p className={`text-3xl font-bold text-${item.color}-600`}>
                            {item.value}{item.unit}
                        </p>
                        {item.period && <p className="text-sm text-gray-500 mt-1">{item.period}</p>}
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                            <div>
                                <p className="font-semibold text-gray-800">{activity.description}</p>
                            </div>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 