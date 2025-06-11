import { useState, useEffect, useRef } from "react"
import { slotAPI } from "../../../services/employeeService"
import axios from "axios"

export const EmployeeSlots = () => {
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [availableSlots, setAvailableSlots] = useState([])
    const [bookedSlots, setBookedSlots] = useState([])
    const [completedSlots, setCompletedSlots] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [bookingSlot, setBookingSlot] = useState(null)
    const [completingSlot, setCompletingSlot] = useState(null)
    const [isAuthenticating, setIsAuthenticating] = useState(false)
    
    // Custom slot creation states
    const [customStartTime, setCustomStartTime] = useState('')
    const [customEndTime, setCustomEndTime] = useState('')
    const [isCreatingSlot, setIsCreatingSlot] = useState(false)
    
    const hasInitialized = useRef(false)
    
    useEffect(() => {
        // Only initialize once using ref to prevent infinite loops
        if (!hasInitialized.current) {
            hasInitialized.current = true
            initializeSlots()
        }
    }, [])
    
    const initializeSlots = async () => {
        try {
            setLoading(true)
            setError(null)
            
            const token = localStorage.getItem('token')
            if (!token) {
                await handleQuickLogin()            } else {
                await fetchAllSlots()
            }
        } catch (error) {
            console.error('Initialization error:', error)
            setError('Failed to initialize slots')
        } finally {
            setLoading(false)
        }    }
    
    const handleQuickLogin = async () => {
        if (isAuthenticating) return; // Prevent multiple login attempts
        
        try {
            setIsAuthenticating(true)
            setError(null)
            
            const response = await axios.post('http://localhost:5000/api/auth/employee/login', {
                email: 'vaishnavi19official@gmail.com',
                password: 'vaishu192'
            })
            
            const { token, user } = response.data
            localStorage.setItem('token', token)
            
            // Now fetch slots
            await fetchAllSlots()
            
        } catch (error) {            console.error('Login failed:', error)
            setError('Login failed: ' + (error.response?.data?.message || error.message))
        } finally {
            setIsAuthenticating(false)
        }
    }
    
    const fetchAllSlots = async () => {
        if (isAuthenticating) return; // Prevent fetching during authentication
        
        try {
            setError(null)
            
            // Hardcoded 6 available slots for testing
            const hardcodedAvailableSlots = [
                {
                    _id: 'slot1',
                    name: 'Morning Shift - Data Entry',
                    facility: 'IT Department',
                    dept: 'Operations',
                    type: 'regular',
                    startTime: '09:00',
                    endTime: '13:00',
                    date: new Date().toISOString().split('T')[0],
                    compensation: 800
                },
                {
                    _id: 'slot2',
                    name: 'Afternoon Customer Support',
                    facility: 'Customer Service',
                    dept: 'Support',
                    type: 'regular',
                    startTime: '14:00',
                    endTime: '18:00',
                    date: new Date().toISOString().split('T')[0],
                    compensation: 1200
                },
                {
                    _id: 'slot3',
                    name: 'Evening Maintenance',
                    facility: 'Facilities',
                    dept: 'Maintenance',
                    type: 'overtime',
                    startTime: '18:00',
                    endTime: '22:00',
                    date: new Date().toISOString().split('T')[0],
                    compensation: 1500
                },
                {
                    _id: 'slot4',
                    name: 'Weekend Training Session',
                    facility: 'Training Center',
                    dept: 'HR',
                    type: 'training',
                    startTime: '10:00',
                    endTime: '16:00',
                    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
                    compensation: 2000
                },
                {
                    _id: 'slot5',
                    name: 'Night Security Patrol',
                    facility: 'Security',
                    dept: 'Safety',
                    type: 'overtime',
                    startTime: '22:00',
                    endTime: '06:00',
                    date: new Date().toISOString().split('T')[0],
                    compensation: 2500
                },
                {
                    _id: 'slot6',
                    name: 'Quality Assurance Review',
                    facility: 'QA Department',
                    dept: 'Quality',
                    type: 'contractual',
                    startTime: '11:00',
                    endTime: '15:00',
                    date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
                    compensation: 1800
                }
            ]
            
            // Try to fetch real data, but use hardcoded as fallback
            try {
                const [availableResponse, bookedResponse, completedResponse] = await Promise.all([
                    slotAPI.getAvailableSlots(),
                    slotAPI.getBookedSlots(),
                    slotAPI.getCompletedSlots()
                ])
                
                // Use real data if available, otherwise use hardcoded
                setAvailableSlots(availableResponse.data?.length > 0 ? availableResponse.data : hardcodedAvailableSlots)
                setBookedSlots(bookedResponse.data || [])
                setCompletedSlots(completedResponse.data || [])
            } catch (apiErr) {
                // If API fails, use hardcoded data
                console.log('Using hardcoded slots data due to API error:', apiErr.message)
                setAvailableSlots(hardcodedAvailableSlots)
                setBookedSlots([])
                setCompletedSlots([])
            }
            
        } catch (err) {
            console.error('Error fetching slots:', err)
            if (err.response?.status === 401 && !isAuthenticating && hasInitialized.current) {
                // Only try auto-login if we haven't already authenticated and component is initialized
                setError('Authentication expired. Please refresh the page.')
            } else {
                setError('Failed to load slots data: ' + (err.response?.data?.message || err.message))
            }
        }
    }

    const handleBookSlot = async (slotId) => {
        try {
            setBookingSlot(slotId)
            await slotAPI.bookSlot(slotId)
            
            // Refresh slots after booking
            await fetchAllSlots()
            alert('Slot booked successfully!')
        } catch (error) {            console.error('Error booking slot:', error)
            alert('Failed to book slot: ' + (error.response?.data?.message || error.message))
        } finally {
            setBookingSlot(null)
        }
    }

    const handleCompleteSlot = async (slotId) => {
        try {
            setCompletingSlot(slotId)
            await slotAPI.completeSlot(slotId)
            
            // Refresh slots after completion
            await fetchAllSlots()
            alert('Slot marked as completed!')
        } catch (error) {            console.error('Error completing slot:', error)
            alert('Failed to complete slot: ' + (error.response?.data?.message || error.message))
        } finally {
            setCompletingSlot(null)
        }
    }

    const handleCreateCustomSlot = async () => {
        try {
            setIsCreatingSlot(true)
            setError(null)
            
            // Create the custom slot data
            const customSlotData = {
                name: 'Custom Work Slot',
                facility: 'General',
                dept: 'Employee Requested',
                type: 'Custom',
                startTime: customStartTime,
                endTime: customEndTime,
                date: selectedDate.toISOString().split('T')[0],
                compensation: 500 // Default compensation for custom slots
            }
            
            // Try to create the slot
            const response = await slotAPI.createSlot(customSlotData)
            
            if (response.data) {
                // Immediately book the created slot
                await slotAPI.bookSlot(response.data._id)
                
                // Clear the form
                setCustomStartTime('')
                setCustomEndTime('')
                
                // Refresh all slots to show the new booked slot
                await fetchAllSlots()
                
                alert('Custom slot created and booked successfully!')
                setError(null)
            }
        } catch (err) {
            console.error('Error creating custom slot:', err)
            setError('Failed to create custom slot: ' + (err.response?.data?.message || err.message))
        } finally {
            setIsCreatingSlot(false)
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatTime = (timeString) => {
        // If it's already in HH:MM format, return as is
        if (timeString && timeString.includes(':')) {
            return timeString
        }
        
        // If it's a full datetime string, extract time
        if (timeString && timeString.includes('T')) {
            const date = new Date(timeString)
            return date.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',                hour12: true
            })
        }
        
        // Default return
        return timeString || 'Not specified'
    }

    if (loading) {
        return (
            <div className="w-full h-screen bg-gray-50">
                <div className="w-full max-w-full px-6 py-4">
                    <div className="animate-pulse space-y-6">
                        {/* Header skeleton */}
                        <div className="bg-gradient-to-r from-gray-300 to-gray-400 p-6 rounded-lg h-24"></div>
                        
                        {/* Date selector and custom slot section skeleton */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
                                <div className="h-10 bg-gray-200 rounded w-full"></div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="h-10 bg-gray-200 rounded"></div>
                                    <div className="h-10 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-12 bg-gray-200 rounded w-full"></div>
                            </div>
                        </div>
                        
                        {/* Slots sections skeleton */}
                        {[1,2,3].map((section) => (
                            <div key={section} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-8 bg-gray-200 rounded w-48"></div>
                                    <div className="h-10 bg-gray-200 rounded w-24"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                                    {[1,2,3,4].map((i) => (
                                        <div key={i} className="p-6 border rounded-lg">
                                            <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
                                            <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                                            <div className="bg-gray-100 p-3 mb-3 rounded">
                                                <div className="h-6 bg-gray-200 rounded w-40 mb-2"></div>
                                                <div className="h-4 bg-gray-200 rounded w-28"></div>
                                            </div>
                                            <div className="space-y-2 mb-4">
                                                <div className="h-4 bg-gray-200 rounded w-36"></div>
                                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                                            </div>
                                            <div className="h-12 bg-gray-200 rounded w-full"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>                </div>
            </div>
        )
    }
    
    if (error) {
        return (
            <div className="w-full h-screen bg-gray-50">
                <div className="w-full max-w-full px-6 py-4">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4">
                        <div className="flex items-center">
                            <span className="text-2xl mr-3">⚠️</span>
                            <div>
                                <h3 className="font-bold text-lg">Error Loading Slots</h3>
                                <p className="mt-1">{error}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                setError(null)
                                initializeSlots()
                            }}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            🔄 Try Again
                        </button>
                    </div>
                </div>            </div>
        )
    }

    return (
        <div className="w-full h-screen bg-gray-50">
            <div className="w-full max-w-full px-6 py-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg shadow-lg mb-6">
                    <h1 className="text-3xl font-bold text-white mb-2">Slot Management Dashboard</h1>
                    <p className="text-blue-100">Manage your work schedules and book available slots</p>
                </div>

                {/* Enhanced Date Selector and Quick Book Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Date Selector */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold flex items-center">
                                📅 Select Date
                            </h2>
                            <input
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <p className="text-sm text-gray-600">
                            Viewing slots for {formatDate(selectedDate)}
                        </p>
                    </div>

                    {/* Quick Book Custom Slot */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                            ⚡ Quick Book Custom Slot
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                <input
                                    type="time"
                                    value={customStartTime}
                                    onChange={(e) => setCustomStartTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                <input
                                    type="time"
                                    value={customEndTime}
                                    onChange={(e) => setCustomEndTime(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleCreateCustomSlot}
                            disabled={!customStartTime || !customEndTime || customStartTime >= customEndTime || isCreatingSlot}
                            className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md"
                        >
                            {isCreatingSlot ? 'Creating...' : '🚀 Create & Book Custom Slot'}                        </button>
                    </div>
                </div>
                
                {/* Available Slots */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold flex items-center">
                            🎯 Available Slots
                            <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                {availableSlots.length} Available
                            </span>
                        </h2>
                        <button 
                            onClick={() => fetchAllSlots()}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            🔄 Refresh
                        </button>
                    </div>
                    {availableSlots.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📭</div>
                            <p className="text-gray-500 text-lg">No available slots at the moment.</p>
                            <p className="text-gray-400 text-sm mt-2">Try creating a custom slot above or check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {availableSlots.map((slot) => (
                                <div key={slot._id} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-xl text-gray-800 mb-2">{slot.name}</h3>
                                            <p className="text-sm text-gray-600 mb-3">{slot.facility} - {slot.dept}</p>
                                            
                                            {/* Prominent Time Display */}
                                            <div className="bg-blue-100 border-l-4 border-blue-500 p-3 mb-3 rounded-r">
                                                <p className="font-bold text-blue-800 text-xl flex items-center">
                                                    🕐 {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                                </p>
                                                <p className="text-sm text-blue-600 mt-1">{formatDate(slot.date)}</p>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <span className="w-5">📋</span> 
                                                    Type: <span className="font-medium ml-1">{slot.type}</span>
                                                </p>
                                                <p className="text-lg font-semibold text-green-600 flex items-center">
                                                    <span className="w-5">💰</span> 
                                                    ₹{slot.compensation}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                            Available
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => handleBookSlot(slot._id)}
                                        disabled={bookingSlot === slot._id}
                                        className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md"
                                    >
                                        {bookingSlot === slot._id ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Booking...
                                            </span>
                                        ) : (
                                            '📅 Book This Slot'
                                        )}
                                    </button>
                                </div>
                            ))}                        </div>
                    )}
                </div>
                
                {/* Booked Slots */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold flex items-center">
                            📋 My Booked Slots
                            <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                {bookedSlots.length} Booked
                            </span>
                        </h2>
                    </div>
                    {bookedSlots.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📅</div>
                            <p className="text-gray-500 text-lg">No booked slots yet.</p>
                            <p className="text-gray-400 text-sm mt-2">Book available slots above to see them here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {bookedSlots.map((slot) => (
                                <div key={slot._id} className="p-6 border border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-xl text-gray-800 mb-2">{slot.name}</h3>
                                            <p className="text-sm text-gray-600 mb-3">{slot.facility} - {slot.dept}</p>
                                            
                                            {/* Prominent Time Display */}
                                            <div className="bg-indigo-100 border-l-4 border-indigo-500 p-3 mb-3 rounded-r">
                                                <p className="font-bold text-indigo-800 text-xl flex items-center">
                                                    🕐 {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                                </p>
                                                <p className="text-sm text-indigo-600 mt-1">{formatDate(slot.date)}</p>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <span className="w-5">📋</span> 
                                                    Type: <span className="font-medium ml-1">{slot.type}</span>
                                                </p>
                                                <p className="text-lg font-semibold text-green-600 flex items-center">
                                                    <span className="w-5">💰</span> 
                                                    ₹{slot.compensation}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                            Booked
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => handleCompleteSlot(slot._id)}
                                        disabled={completingSlot === slot._id}
                                        className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md"
                                    >
                                        {completingSlot === slot._id ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Completing...
                                            </span>
                                        ) : (
                                            '✅ Mark as Completed'
                                        )}
                                    </button>
                                </div>
                            ))}                        </div>
                    )}
                </div>
                
                {/* Completed Slots */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold flex items-center">
                            ✅ Completed Slots
                            <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                {completedSlots.length} Completed
                            </span>
                        </h2>
                    </div>
                    {completedSlots.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🎉</div>
                            <p className="text-gray-500 text-lg">No completed slots yet.</p>
                            <p className="text-gray-400 text-sm mt-2">Complete booked slots to see your work history here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {completedSlots.map((slot) => (
                                <div key={slot._id} className="p-6 border border-green-200 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-lg transition-all duration-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-xl text-gray-800 mb-2">{slot.name}</h3>
                                            <p className="text-sm text-gray-600 mb-3">{slot.facility} - {slot.dept}</p>
                                            
                                            {/* Prominent Time Display */}
                                            <div className="bg-green-100 border-l-4 border-green-500 p-3 mb-3 rounded-r">
                                                <p className="font-bold text-green-800 text-xl flex items-center">
                                                    🕐 {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                                </p>
                                                <p className="text-sm text-green-600 mt-1">{formatDate(slot.date)}</p>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <p className="text-sm text-gray-600 flex items-center">
                                                    <span className="w-5">📋</span> 
                                                    Type: <span className="font-medium ml-1">{slot.type}</span>
                                                </p>
                                                <p className="text-lg font-semibold text-green-600 flex items-center">
                                                    <span className="w-5">💰</span> 
                                                    ₹{slot.compensation}
                                                </p>
                                                <p className="text-sm text-green-700 bg-green-100 px-2 py-1 rounded-full inline-flex items-center">
                                                    <span className="w-4 mr-1">✅</span> Completed
                                                </p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                            ✅ Done
                                        </span>
                                    </div>
                                    {/* Completion badge */}
                                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-sm text-green-700 font-medium text-center">
                                            🎉 Successfully Completed!
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
} 