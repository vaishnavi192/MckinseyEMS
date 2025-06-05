import { KeyDetailBoxContentWrapper } from "../../../components/common/Dashboard/contentwrappers.jsx"
import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx"
import { DataTable } from "../../../components/common/Dashboard/datatable.jsx"
import { useEffect } from "react"
import { HandleGetDashboard } from "../../../redux/Thunks/DashboardThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Loading } from "../../../components/common/loading.jsx"

export const HRDashboardPage = () => {
    console.log("Reloaded")
    const DashboardState = useSelector((state) => state.dashboardreducer)
    const dispatch = useDispatch()
    const DataArray = [
        {
            image: "/../../src/assets/HR-Dashboard/employee-2.png",
            dataname: "employees",
            label: "employees",
            path: "/HR/dashboard/employees"
        },
        {
            image: "/../../src/assets/HR-Dashboard/department.png",
            dataname: "departments",
            label: "departments",
            path: "/HR/dashboard/departments",
        },
        {
            image: "/../../src/assets/HR-Dashboard/leave.png",
            dataname: "leaves",
            label: "leaves",
            path: "/HR/dashboard/leaves"
        },
        {
            image: "/../../src/assets/HR-Dashboard/attendance.png",
            dataname: "occupancy",
            label: "occupancy",
            path: "/HR/dashboard/occupancy"
        }
    ]

    useEffect(() => {
        dispatch(HandleGetDashboard({ apiroute: "GETDATA" }))
    },[])

    if (DashboardState.isLoading) { 
        return (
            <Loading />
        )
    }

    return (
        <>
            <KeyDetailBoxContentWrapper imagedataarray={DataArray} data={DashboardState.data} />
            <div className="salary-notices-container h-3/4 grid min-[250px]:grid-cols-1 lg:grid-cols-2 min-[250px]:gap-3 xl:gap-3">
                <SalaryChart balancedata={DashboardState.data} />
                <DataTable noticedata={DashboardState.data} />
            </div>
        </>
    )
}