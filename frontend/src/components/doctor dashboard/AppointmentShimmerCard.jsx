import React from 'react';

const AppointmentShimmerCard = () => {
  return (
      <div className="animate-pulse flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        <div className="space-y-2">
          <div className="w-24 h-3 bg-gray-300 rounded"></div>
          <div className="w-32 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>

      <div className="text-right space-y-2">
        <div className="w-40 h-3 bg-gray-300 rounded ml-auto"></div>
        <div className="w-24 h-4 bg-gray-300 rounded ml-auto"></div>
      </div>
    </div>
  );
}

export default AppointmentShimmerCard;
