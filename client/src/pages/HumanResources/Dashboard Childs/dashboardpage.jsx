import { KeyDetailBoxContentWrapper } from "../../../components/common/Dashboard/contentwrappers.jsx"
import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx"
import { DataTable } from "../../../components/common/Dashboard/datatable.jsx"
export const HRDashboardPage = () => {

    return (
        <>
            <KeyDetailBoxContentWrapper />
            <div className="salary-notices-container h-3/4 grid min-[250px]:grid-cols-1 lg:grid-cols-2">
                <SalaryChart />
                <DataTable />
            </div>
        </>
    )
}