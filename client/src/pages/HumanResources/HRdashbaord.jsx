import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
import { HRdashboardSidebar } from "../../components/ui/HRsidebar.jsx"
import { Outlet } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"

export const HRDashbaord = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const pathArray = location.pathname.split("/")

    
    useEffect(() => {
        navigate(`/HR/dashboard/${pathArray[pathArray.length - 1]}`)
    }, [])


    console.log("this is the current path location", location)


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