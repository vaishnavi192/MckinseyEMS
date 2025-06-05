import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom"

export function EmployeeSidebar({ isOpen, setIsOpen }) {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-3 p-2">
                            {/* Dashboard */}
                            <NavLink to={"/auth/employee/employee-dashboard/dashboard-data"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/dashboard.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Dashboard</button>
                                </SidebarMenuItem>
                            </NavLink>

                            {/* Slots */}
                            <NavLink to={"/auth/employee/employee-dashboard/slots"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/request.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Slots</button>
                                </SidebarMenuItem>
                            </NavLink>

                            {/* Work Hours */}
                            <NavLink to={"/auth/employee/employee-dashboard/work-hours"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/attendance.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Work Hours</button>
                                </SidebarMenuItem>
                            </NavLink>

                            {/* Earnings */}
                            <NavLink to={"/auth/employee/employee-dashboard/earnings"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/salary.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Earnings</button>
                                </SidebarMenuItem>
                            </NavLink>

                            {/* Wellness */}
                            <NavLink to={"/auth/employee/employee-dashboard/wellness"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/employee-2.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Wellness</button>
                                </SidebarMenuItem>
                            </NavLink>

                            {/* Awards */}
                            <NavLink to={"/auth/employee/employee-dashboard/awards"} className={({ isActive }) => { return isActive ? "bg-blue-200 rounded-lg" : "" }}>
                                <SidebarMenuItem className="flex gap-4 hover:bg-blue-200 rounded-lg">
                                    <img src="/../../src/assets/HR-Dashboard/request.png" alt="" className="w-7 ms-2 my-1" />
                                    <button className="text-[16px]">Awards</button>
                                </SidebarMenuItem>
                            </NavLink>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
} 