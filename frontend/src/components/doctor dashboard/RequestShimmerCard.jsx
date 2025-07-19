import React from 'react';

const RequestShimmerCard = () => {
  return (
     <div className="bg-white p-4 rounded-md shadow-sm border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-pulse">
      {/* Left section - Avatar and name */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div className="space-y-2">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-32 h-5 bg-gray-400 rounded"></div>
        </div>
      </div>

      {/* Center - Date and time */}
      <div className="space-y-2">
        <div className="w-40 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Appointment type */}
      <div className="flex flex-col gap-2">
        <div className="w-36 h-4 bg-gray-300 rounded"></div>
        <div className="w-28 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Appointment status */}
      <div className="flex flex-col gap-2 p-2">
        <div className="w-36 h-4 bg-gray-300 rounded"></div>
        <div className="w-28 h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default RequestShimmerCard;
