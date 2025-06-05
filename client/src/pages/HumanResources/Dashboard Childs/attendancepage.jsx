import React, { useState } from 'react';

export const HRAttendancePage = () => {
  const [dummyAttendance, setDummyAttendance] = useState([
    {
      _id: "1",
      employeeName: "Rahul Sharma",
      date: "2024-07-01",
      status: "Present"
    },
    {
      _id: "2",
      employeeName: "Priya Patel",
      date: "2024-07-01",
      status: "Present"
    },
    {
      _id: "3",
      employeeName: "Amit Kumar",
      date: "2024-07-01",
      status: "Absent"
    },
    {
      _id: "4",
      employeeName: "Neha Gupta",
      date: "2024-07-01",
      status: "Present"
    },
    {
      _id: "5",
      employeeName: "Rahul Sharma",
      date: "2024-07-02",
      status: "Present"
    },
    {
      _id: "6",
      employeeName: "Priya Patel",
      date: "2024-07-02",
      status: "Absent"
    },
    {
        _id: "7",
        employeeName: "Nehal sharma",
        date: "2024-07-01",
        status: "Present"
      },
      {
        _id: "8",
        employeeName: "Pahul Sharma",
        date: "2024-07-02",
        status: "Absent"
      },
      {
        _id: "9",
        employeeName: "riya singh",
        date: "2024-07-02",
        status: "Absent"
      },
  ]);

  return (
    <div className="attendance-page-container w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
      <div className="attendance-heading flex justify-between items-center md:pe-5">
        <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Attendances</h1>
      </div>
      <div className="attendance-data flex flex-col gap-4 md:pe-5 overflow-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Employee Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyAttendance.map((attendance) => (
              <tr key={attendance._id}>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{attendance.employeeName}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{attendance.date}</td>
                <td className={`px-4 py-2 border-b border-gray-200 text-sm ${attendance.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>{attendance.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {dummyAttendance.length === 0 && (
          <div className="flex justify-center items-center h-40">
              <p className="text-muted-foreground">No attendance data available</p>
          </div>
        )}
      </div>
    </div>
  );
}; 