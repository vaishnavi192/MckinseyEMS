import { useState } from "react"

export const EmployeeEarnings = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('default', { month: 'long' }))

    // Mock data for monthly earnings
    const monthlyEarnings = {
        baseSalary: 5000,
        slotEarnings: 8300, // Total from completed slots
        bonuses: [
            { name: "Performance Bonus", amount: 500 },
            { name: "Project Completion", amount: 300 },
            { name: "Overtime Bonus", amount: 400 },
        ],
        deductions: [
            { name: "Tax", amount: 1200 },
            { name: "Insurance", amount: 200 },
        ]
    }

    // Mock data for slot earnings breakdown
    const slotEarningsBreakdown = [
        { name: "Morning Shift - Data Entry", amount: 800, date: "2024-06-05", duration: "4 hours" },
        { name: "Afternoon Customer Support", amount: 1200, date: "2024-06-04", duration: "4 hours" },
        { name: "Evening Maintenance", amount: 1500, date: "2024-06-03", duration: "4 hours" },
        { name: "Weekend Training Session", amount: 2000, date: "2024-06-02", duration: "6 hours" },
        { name: "Night Security Patrol", amount: 2500, date: "2024-06-01", duration: "8 hours" },
        { name: "Quality Assurance Review", amount: 300, date: "2024-05-31", duration: "2 hours" }
    ]

    // Mock data for recent transactions
    const recentTransactions = [
        { date: "2024-06-05", description: "Monthly Salary", amount: 5000, type: "credit" },
        { date: "2024-06-05", description: "Slot: Morning Data Entry", amount: 800, type: "credit" },
        { date: "2024-06-04", description: "Slot: Customer Support", amount: 1200, type: "credit" },
        { date: "2024-06-03", description: "Slot: Evening Maintenance", amount: 1500, type: "credit" },
        { date: "2024-06-03", description: "Performance Bonus", amount: 500, type: "credit" },
        { date: "2024-06-02", description: "Slot: Training Session", amount: 2000, type: "credit" },
        { date: "2024-06-01", description: "Slot: Security Patrol", amount: 2500, type: "credit" },
        { date: "2024-06-01", description: "Tax Deduction", amount: -1200, type: "debit" },
        { date: "2024-05-31", description: "Slot: QA Review", amount: 300, type: "credit" },
    ]

    return (
        <div className="w-full px-6 py-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Earnings & Salary</h1>

            {/* Monthly Overview */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">Monthly Overview</h2>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    >
                        {Array.from({ length: 12 }, (_, i) => {
                            const date = new Date()
                            date.setMonth(i)
                            return (
                                <option key={i} value={date.toLocaleString('default', { month: 'long' })}>
                                    {date.toLocaleString('default', { month: 'long' })}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Base Salary */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-800">Base Salary</h3>
                        <p className="text-2xl font-bold text-blue-600 mt-1">₹{monthlyEarnings.baseSalary}</p>
                        <p className="text-sm text-blue-700">Monthly</p>
                    </div>

                    {/* Slot Earnings */}
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h3 className="text-lg font-semibold text-orange-800">Slot Earnings</h3>
                        <p className="text-2xl font-bold text-orange-600 mt-1">₹{monthlyEarnings.slotEarnings}</p>
                        <p className="text-sm text-orange-700">From Completed Slots</p>
                    </div>

                    {/* Total Bonuses */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h3 className="text-lg font-semibold text-green-800">Total Bonuses</h3>
                        <p className="text-2xl font-bold text-green-600 mt-1">
                            ₹{monthlyEarnings.bonuses.reduce((sum, bonus) => sum + bonus.amount, 0)}
                        </p>
                        <p className="text-sm text-green-700">This Month</p>
                    </div>

                    {/* Net Earnings */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="text-lg font-semibold text-purple-800">Net Earnings</h3>
                        <p className="text-2xl font-bold text-purple-600 mt-1">
                            ₹{monthlyEarnings.baseSalary +
                                monthlyEarnings.slotEarnings +
                                monthlyEarnings.bonuses.reduce((sum, bonus) => sum + bonus.amount, 0) -
                                monthlyEarnings.deductions.reduce((sum, deduction) => sum + deduction.amount, 0)}
                        </p>
                        <p className="text-sm text-purple-700">After Deductions</p>
                    </div>
                </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Detailed Breakdown</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Slot Earnings */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-600 mb-3">Slot Earnings</h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {slotEarningsBreakdown.map((slot, index) => (
                                <div key={index} className="flex justify-between items-start p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <div className="flex-1">
                                        <span className="font-medium text-gray-800 block text-sm">{slot.name}</span>
                                        <span className="text-xs text-gray-600">{slot.date} • {slot.duration}</span>
                                    </div>
                                    <span className="text-orange-600 font-semibold">+₹{slot.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bonuses */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-600 mb-3">Bonuses</h3>
                        <div className="space-y-3">
                            {monthlyEarnings.bonuses.map((bonus, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                    <span className="font-medium text-gray-800">{bonus.name}</span>
                                    <span className="text-green-600 font-semibold">+₹{bonus.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Deductions */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-600 mb-3">Deductions</h3>
                        <div className="space-y-3">
                            {monthlyEarnings.deductions.map((deduction, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200">
                                    <span className="font-medium text-gray-800">{deduction.name}</span>
                                    <span className="text-red-600 font-semibold">-₹{deduction.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
                <div className="space-y-3">
                    {recentTransactions.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                            <div>
                                <p className="font-semibold text-gray-800">{transaction.description}</p>
                                <p className="text-sm text-gray-500">{transaction.date}</p>
                            </div>
                            <span className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.type === 'credit' ? '+' : ''}₹{transaction.amount}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
} 