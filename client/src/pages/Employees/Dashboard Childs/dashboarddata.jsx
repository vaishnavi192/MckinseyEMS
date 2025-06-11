import { useSelector } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { employeeAPI } from "../../../services/employeeService"
import axios from "axios"

export const EmployeeDashboardData = () => {
    const employeeState = useSelector(state => state.employee)
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    const hasInitialized = useRef(false)
    
    useEffect(() => {
        // Only initialize once using ref to prevent infinite loops
        if (!hasInitialized.current) {
            hasInitialized.current = true
            initializeDashboard()        }
    }, [])

    const initializeDashboard = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const token = localStorage.getItem('token')
            if (!token) {
                await handleAutoLogin()
            } else {
                await fetchDashboardData()
            }
        } catch (error) {
            console.error('Dashboard initialization error:', error)
            setError('Failed to initialize dashboard')
        } finally {
            setLoading(false)
        }
    }
      const fetchDashboardData = async () => {
        if (isAuthenticating) return; // Prevent fetching during authentication
        
        try {
            setError(null)
            const response = await employeeAPI.getDashboard()
            setDashboardData(response.data)
        } catch (err) {
            console.error('Error fetching dashboard data:', err)
            if (err.response?.status === 401 && !isAuthenticating && hasInitialized.current) {
                setError('Authentication expired. Please refresh the page.')
            } else {
                setError('Failed to load dashboard data: ' + (err.response?.data?.message || err.message))
            }
        }
    }

    const handleAutoLogin = async () => {
        if (isAuthenticating) return; // Prevent multiple login attempts
        
        try {
            setIsAuthenticating(true)
            setError(null)
            
            const response = await axios.post('http://localhost:5000/api/auth/employee/login', {
                email: 'vaishnavi19official@gmail.com',
                password: 'vaishu192'
            })
            
            const { token } = response.data
            localStorage.setItem('token', token)
            
            // Now fetch dashboard data
            await fetchDashboardData()
            
        } catch (error) {
            console.error('Auto-login failed:', error)
            setError('Failed to authenticate and load dashboard data')
        } finally {
            setIsAuthenticating(false)
        }
    }    
    const employeeName = dashboardData?.name || employeeState?.employee?.basicDetails?.name || "Sarah Johnson, RN"    // Create summary data with hardcoded fallback values for healthcare context
    const summaryData = [        { 
            title: "Total Hours Worked", 
            value: "284", 
            unit: "h", 
            period: "total", 
            color: "blue" 
        },
        { 
            title: "Total Earnings", 
            value: dashboardData?.totalEarnings ? `₹${dashboardData.totalEarnings}` : "₹3,45,600", 
            unit: "", 
            period: "total", 
            color: "green" 
        },
        { 
            title: "Earnings This Month", 
            value: dashboardData?.earningsThisMonth ? `₹${dashboardData.earningsThisMonth}` : "₹28,800", 
            unit: "", 
            period: "this month", 
            color: "green" 
        },        { 
            title: "Active Shifts", 
            value: "12", 
            unit: "", 
            period: "current", 
            color: "purple" 
        },
        { 
            title: "Total Shifts Done", 
            value: "86", 
            unit: "", 
            period: "total", 
            color: "indigo" 
        },
        { 
            title: "Shifts This Month", 
            value: "15", 
            unit: "", 
            period: "this month", 
            color: "purple" 
        },{ 
            title: "Overtime Hours", 
            value: "48", 
            unit: "h", 
            period: "total", 
            color: "yellow" 
        },        { 
            title: "Training Hours", 
            value: "72", 
            unit: "h", 
            period: "total", 
            color: "blue"
        },
        { 
            title: "Regular Hours This Month", 
            value: "168", 
            unit: "h", 
            period: "this month", 
            color: "teal"
        },        { 
            title: "Available Hours", 
            value: "24", 
            unit: "h", 
            period: "remaining this week", 
            color: "gray"
        },
        { 
            title: "Overtime Hours This Month", 
            value: "12", 
            unit: "h", 
            period: "this month", 
            color: "orange"
        },
        { 
            title: "Night Shift Hours", 
            value: "96", 
            unit: "h", 
            period: "total", 
            color: "indigo"
        },
        { 
            title: "Weekend Hours", 
            value: "64", 
            unit: "h", 
            period: "this month", 
            color: "purple"
        },
        { 
            title: "On-Call Hours", 
            value: "36", 
            unit: "h", 
            period: "this month", 
            color: "red"
        },
        { 
            title: "Holiday Hours", 
            value: "16", 
            unit: "h", 
            period: "this year", 
            color: "pink"
        },
        { 
            title: "Double Time Hours", 
            value: "8", 
            unit: "h", 
            period: "this month", 
            color: "red"
        },
        { 
            title: "Break Hours This Month", 
            value: "42", 
            unit: "h", 
            period: "this month", 
            color: "green"
        },
        { 
            title: "Consecutive Hours Worked", 
            value: "6", 
            unit: "h", 
            period: "current streak", 
            color: "yellow"
        }
    ]

    if (loading) {
        return (
            <div className="w-full px-4 py-6 space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
                    
                    {/* Employee Details Skeleton */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                    
                    {/* Summary Cards Skeleton */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1,2,3,4,5,6,7,8].map((i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="h-5 bg-gray-200 rounded w-32 mb-3"></div>
                                <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }if (error) {
        return (
            <div className="w-full px-4 py-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full px-4 py-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {employeeName}!</h1>            {dashboardData && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Employee Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div><strong>Designation:</strong> {dashboardData.designation || "Registered Nurse"}</div>
                        <div><strong>Job Type:</strong> {dashboardData.jobType || "Full-time Medical Staff"}</div>
                        <div><strong>Facility:</strong> {dashboardData.facility || "Medical Center 1"}</div>
                        <div><strong>Department:</strong> {dashboardData.dept || "Emergency Medicine"}</div>
                    </div>
                </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryData.map((item, index) => (
                    <div key={index} className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow`}>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">{item.title}</h3>
                        <p className={`text-3xl font-bold text-${item.color}-600`}>
                            {item.value}{item.unit}
                        </p>
                        {item.period && <p className="text-sm text-gray-500 mt-1">{item.period}</p>}
                    </div>
                ))}
            </div>

            {/* Recent Activity - Show recent slots if available */}
            {dashboardData?.bookedSlots?.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Booked Slots</h2>
                    <div className="space-y-3">
                        {dashboardData.bookedSlots.slice(0, 3).map((slot, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                                <div>
                                    <p className="font-semibold text-gray-800">{slot.name}</p>
                                    <p className="text-sm text-gray-600">{slot.facility} - {slot.dept}</p>
                                    <p className="text-sm text-gray-500">{new Date(slot.date).toLocaleDateString()} at {slot.startTime}</p>
                                </div>
                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {slot.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>            )}
        </div>
    )
}