import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const DataTable = ({ noticedata }) => {
    const Notices = [
        {
            noticeID: 1,
            noticeTitle: "Office Holiday Notice",
            noticeAudience: "All Employees",
            noticeCreatedBy: "John Smith"
        },
        {
            noticeID: 2,
            noticeTitle: "Team Building Event",
            noticeAudience: "Development Team",
            noticeCreatedBy: "Sarah Johnson"
        },
        {
            noticeID: 3,
            noticeTitle: "System Maintenance",
            noticeAudience: "IT Department",
            noticeCreatedBy: "Mike Wilson"
        },
        {
            noticeID: 4,
            noticeTitle: "Quarterly Review Meeting",
            noticeAudience: "Department Heads",
            noticeCreatedBy: "Lisa Brown"
        },
        {
            noticeID: 5,
            noticeTitle: "New Policy Implementation",
            noticeAudience: "All Employees",
            noticeCreatedBy: "David Lee"
        }
    ]

    return (
        <div className="overflow-auto h-full">
            <div className="notices-heading mx-3 my-2">
                <p className="min-[250px]:text-xl xl:text-3xl font-bold min-[250px]:text-center sm:text-start">Recent Notices</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Notice ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Audience</TableHead>
                        <TableHead className="text-right">Created By</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Notices.map((Notice) => (
                        <TableRow key={Notice.noticeID}>
                            <TableCell className="font-medium">{Notice.noticeID}</TableCell>
                            <TableCell>{Notice.noticeTitle}</TableCell>
                            <TableCell>{Notice.noticeAudience}</TableCell>
                            <TableCell className="text-right">{Notice.noticeCreatedBy}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}