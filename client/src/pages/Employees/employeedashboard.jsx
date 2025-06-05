import { useState } from "react"
import { Outlet } from "react-router-dom"
import { EmployeeSidebar } from "../../components/ui/Employeesidebar.jsx"
import { SidebarProvider } from "../../components/ui/sidebar"

export const EmployeeDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
                    <EmployeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    )
}