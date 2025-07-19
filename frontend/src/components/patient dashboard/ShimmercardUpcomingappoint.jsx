import React from 'react';

const ShimmercardUpcomingappoint = () => {
  return (
      <div className="bg-gray-50 border p-4 rounded-xl shadow-sm flex flex-col gap-3 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex flex-col gap-2">
            <div className="w-32 h-4 bg-gray-200 rounded" />
            <div className="w-24 h-3 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="bg-gray-200 p-3 rounded-full w-8 h-8" />
      </div>
      <div className="flex items-center text-sm text-gray-600 gap-2">
        <div className="w-4 h-4 bg-gray-300 rounded-full" />
        <div className="w-40 h-3 bg-gray-200 rounded" />
      </div>
      <div className="flex gap-3 mt-2">
        <div className="w-24 h-8 rounded-full bg-gray-200" />
        <div className="w-24 h-8 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

export default ShimmercardUpcomingappoint;
