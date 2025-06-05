import React from 'react';

export const HROccupancyPage = () => {
  return (
    <div className="occupancy-page-container w-full mx-auto my-10 flex flex-col gap-5 h-[94%]">
      <div className="occupancy-heading flex justify-between items-center md:pe-5">
        <h1 className="min-[250px]:text-xl md:text-4xl font-bold">Occupancy Details</h1>
      </div>
      <div className="occupancy-data flex flex-col gap-4 md:pe-5 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Current Status</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Occupancy</span>
                <span className="font-bold text-blue-600">150</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Available Seats</span>
                <span className="font-bold text-green-600">50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Occupancy Rate</span>
                <span className="font-bold text-purple-600">75%</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Employee Distribution</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Currently Checked In</span>
                <span className="font-bold text-blue-600">100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Remote Employees</span>
                <span className="font-bold text-orange-600">30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Visitors Today</span>
                <span className="font-bold text-green-600">5</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Floor-wise Distribution</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ground Floor</span>
                <span className="font-bold text-blue-600">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">First Floor</span>
                <span className="font-bold text-blue-600">55</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Second Floor</span>
                <span className="font-bold text-blue-600">50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 