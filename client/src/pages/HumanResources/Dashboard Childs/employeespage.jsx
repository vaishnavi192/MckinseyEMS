import { ListWrapper } from "../../../components/common/Dashboard/ListDesigns"
import { HeadingBar } from "../../../components/common/Dashboard/ListDesigns"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleGetHREmployees } from "../../../redux/Thunks/HREmployeesThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { ListItems } from "../../../components/common/Dashboard/ListDesigns"
import { ListContainer } from "../../../components/common/Dashboard/ListDesigns"
import { AddEmployeesDialogBox } from "../../../components/common/Dashboard/dialogboxes.jsx"

export const HREmployeesPage = () => {
    const dispatch = useDispatch()
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)
    const table_headings = ["Full Name", "Email", "Department", "Contact Number", "Modify Employee"]
    const [dummyEmployees, setDummyEmployees] = useState([
        {
            _id: "1",
            fullname: "Rahul Sharma",
            email: "rahul.sharma@company.com",
            department: "Engineering",
            contactnumber: "+91 9876543210"
        },
        {
            _id: "2",
            fullname: "Priya Patel",
            email: "priya.patel@company.com",
            department: "Marketing",
            contactnumber: "+91 9876543211"
        },
        {
            _id: "3",
            fullname: "Amit Kumar",
            email: "amit.kumar@company.com",
            department: "Sales",
            contactnumber: "+91 9876543212"
        },
        {
            _id: "4",
            fullname: "Neha Gupta",
            email: "neha.gupta@company.com",
            department: "HR",
            contactnumber: "+91 9876543213"
        },
        {
            _id: "5",
            fullname: "Vikram Singh",
            email: "vikram.singh@company.com",
            department: "Finance",
            contactnumber: "+91 9876543214"
        },
        {
            _id: "6",
            fullname: "Anjali Verma",
            email: "anjali.verma@company.com",
            department: "Operations",
            contactnumber: "+91 9876543215"
        },
        {
            _id: "7",
            fullname: "Rajesh Kumar",
            email: "rajesh.kumar@company.com",
            department: "IT",
            contactnumber: "+91 9876543216"
        },
        {
            _id: "8",
            fullname: "Sneha Reddy",
            email: "sneha.reddy@company.com",
            department: "Customer Support",
            contactnumber: "+91 9876543217"
        }
    ])

    useEffect(() => {
        if (HREmployeesState.fetchData) {
            dispatch(HandleGetHREmployees({ apiroute: "GETALL" }))
        }
    }, [HREmployeesState.fetchData])

    useEffect(() => {
        dispatch(HandleGetHREmployees({ apiroute: "GETALL" }))
    }, [])

    if (HREmployeesState.isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="employee-page-content w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
            <div className="employees-heading flex justify-between items-center md:pe-5">
                <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Employees</h1>
                <div className="employee-crate-button">
                    <AddEmployeesDialogBox />
                </div>
            </div>
            <div className="employees-data flex flex-col gap-4 md:pe-5 overflow-auto">
                <ListWrapper>
                    <HeadingBar table_layout={"grid-cols-5"} table_headings={table_headings} />
                </ListWrapper>
                <ListContainer>
                    {dummyEmployees.map((employee) => (
                        <div key={employee._id} className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50">
                            <div className="font-medium break-words">{employee.fullname}</div>
                            <div className="break-words">{employee.email}</div>
                            <div className="break-words">{employee.department}</div>
                            <div className="break-words">{employee.contactnumber}</div>
                            <div className="flex gap-2 break-words">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Edit</button>
                                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                            </div>
                        </div>
                    ))}
                </ListContainer>
            </div>
        </div>
    )
}