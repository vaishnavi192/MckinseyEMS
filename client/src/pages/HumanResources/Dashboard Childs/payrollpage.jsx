import React, { useState } from 'react';

export const HRPayrollPage = () => {
  const [dummyPayroll, setDummyPayroll] = useState([
    {
      _id: "p1",
      employeeName: "Rahul Sharma",
      month: "July 2024",
      basicSalary: 50000,
      allowances: 10000,
      deductions: 2000,
      netSalary: 58000
    },
    {
      _id: "p2",
      employeeName: "Priya Patel",
      month: "July 2024",
      basicSalary: 60000,
      allowances: 12000,
      deductions: 2500,
      netSalary: 69500
    },
    {
      _id: "p3",
      employeeName: "Amit Kumar",
      month: "July 2024",
      basicSalary: 45000,
      allowances: 8000,
      deductions: 1500,
      netSalary: 51500
    },
    {
      _id: "p4",
      employeeName: "Neha Gupta",
      month: "July 2024",
      basicSalary: 55000,
      allowances: 11000,
      deductions: 2200,
      netSalary: 63800
    },
    {
      _id: "p5",
      employeeName: "Vikram Singh",
      month: "July 2024",
      basicSalary: 62000,
      allowances: 13000,
      deductions: 2800,
      netSalary: 72200
    },
    {
      _id: "p6",
      employeeName: "Anjali Verma",
      month: "July 2024",
      basicSalary: 48000,
      allowances: 9000,
      deductions: 1800,
      netSalary: 55200
    },
    {
      _id: "p7",
      employeeName: "Rajesh Kumar",
      month: "July 2024",
      basicSalary: 52000,
      allowances: 10500,
      deductions: 2100,
      netSalary: 60400
    },
    {
      _id: "p8",
      employeeName: "Sneha Reddy",
      month: "July 2024",
      basicSalary: 58000,
      allowances: 11500,
      deductions: 2300,
      netSalary: 67200
    },
    {
      _id: "p9",
      employeeName: "Mohit Yadav",
      month: "July 2024",
      basicSalary: 49000,
      allowances: 9500,
      deductions: 1900,
      netSalary: 56600
    },
  ]);

  return (
    <div className="payroll-page-container w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
      <div className="payroll-heading flex justify-between items-center md:pe-5">
        <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Payroll</h1>
      </div>
      <div className="payroll-data flex flex-col gap-4 md:pe-5 overflow-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Employee Name</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Month</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Basic Salary</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Allowances</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Deductions</th>
              <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {dummyPayroll.map((payroll) => (
              <tr key={payroll._id}>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{payroll.employeeName}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{payroll.month}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{payroll.basicSalary}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{payroll.allowances}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm">{payroll.deductions}</td>
                <td className="px-4 py-2 border-b border-gray-200 text-sm font-semibold">{payroll.netSalary}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {dummyPayroll.length === 0 && (
          <div className="flex justify-center items-center h-40">
              <p className="text-muted-foreground">No payroll data available</p>
          </div>
        )}
      </div>
    </div>
  );
}; 