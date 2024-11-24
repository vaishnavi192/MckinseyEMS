import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { HRdashboardSidebar } from "../../components/ui/HRsidebar.jsx"
import { Outlet } from "react-router-dom"
import { useState } from "react"

export const HRDashbaord = () => {
    return (
        <div className="HR-dashboard-container flex">

            <div className="HRDashboard-sidebar">
                <SidebarProvider>
                    <HRdashboardSidebar />
                    <SidebarTrigger />
                </SidebarProvider>
            </div>
            <div className="HRdashboard-container h-screen w-[81.5vw] mx-auto flex flex-col">
                <Outlet />
            </div>
        </div>
    )
}