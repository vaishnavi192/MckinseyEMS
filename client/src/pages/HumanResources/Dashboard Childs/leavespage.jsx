import React, { useState } from 'react';

export const HRLeavesPage = () => {
  const [dummyLeaves, setDummyLeaves] = useState([
    {
      _id: "l1",
      employeeName: "Rahul Sharma",
      startDate: "2024-07-10",
      endDate: "2024-07-12",
      reason: "Fever",
      status: "Approved"
    },
    {
      _id: "l2",
      employeeName: "Priya Patel",
      startDate: "2024-07-15",
      endDate: "2024-07-15",
      reason: "Casual Leave",
      status: "Pending"
    },
    {
      _id: "l3",
      employeeName: "Amit Kumar",
      startDate: "2024-07-08",
      endDate: "2024-07-08",
      reason: "Personal work",
      status: "Rejected"
    },
    {
      _id: "l4",
      employeeName: "Neha Gupta",
      startDate: "2024-07-20",
      endDate: "2024-07-25",
      reason: "Vacation",
      status: "Approved"
    },
    {
      _id: "l5",
      employeeName: "Vikram Singh",
      startDate: "2024-07-05",
      endDate: "2024-07-05",
      reason: "Sick leave",
      status: "Approved"
    },
  ]);

  return (
    <div className="leaves-page-container w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
      <div className="leaves-heading flex justify-between items-center md:pe-5">
        <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Leaves</h1>
      </div>
      <div className="leaves-data flex flex-col gap-4 md:pe-5 overflow-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Employee Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyLeaves.map((leave) => (
              <tr key={leave._id}>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{leave.employeeName}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{leave.startDate}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{leave.endDate}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm break-words max-w-xs">{leave.reason}</td>
                <td className={`px-4 py-2 border-b border-gray-200 text-sm ${leave.status === 'Approved' ? 'text-green-600' : leave.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {dummyLeaves.length === 0 && (
          <div className="flex justify-center items-center h-40">
              <p className="text-muted-foreground">No leaves data available</p>
          </div>
        )}
      </div>
    </div>
  );
}; 