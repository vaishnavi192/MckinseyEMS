import { KeyDetailsBox } from "./keydetailboxes"
import { Link } from "react-router-dom"

export const ContentWraperMain = ({ children }) => {
    return (
        <div className="container h-full w-auto flex flex-col">
            {children ? children : null}
        </div>
    )
}

export const KeyDetailBoxContentWrapper = () => {
    const DataArray = [
        {
            image: "/../../src/assets/HR-Dashboard/employee-2.png",
            dataname: "Employees"
        },
        {
            image: "/../../src/assets/HR-Dashboard/department.png",
            dataname: "Departments"
        },
        {
            image: "/../../src/assets/HR-Dashboard/leave.png",
            dataname: "Leaves"
        },
        {
            image: "/../../src/assets/HR-Dashboard/request.png",
            dataname: "Requests"
        }
    ]
    return (
        <div className="key-details-box-content grid min-[250px]:grid-cols-1 sm:grid-cols-2 min-[1000px]:grid-cols-4 my-2">
            {DataArray.map((item) => <Link> <KeyDetailsBox image={item.image} dataname={item.dataname} /> </Link>)}
        </div>
    )
}
