import React, { useEffect } from 'react';
import { CheckCircle, Video } from 'lucide-react';

const BookingSummaryCard = ({doctor,appointment}) => {

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-black rounded-xl border shadow-sm w-full max-w-md ">
      <h2 className="text-xl font-semibold dark:text-white mb-4">Booking Summary</h2>

      {/* Doctor Info */}
      <div className="flex items-center justify-between p-4 rounded-md border mb-5">
        <div className="flex items-center gap-3">
          <img
            src={doctor?.profilepic}
            alt="doctor"
            className="w-12 h-12 rounded-full object-cover border"
          />
          <div>
            <p className="font-semibold dark:text-white text-gray-900">{doctor?.name}</p>
            <p className="text-gray-500 dark:text-white font-[500] text-sm">{doctor?.specialization}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600 w-5 h-5" />
        </div>
      </div>

      {/* Booking Details */}
      <div className="p-4 border rounded-md space-y-3 text-sm dark:text-white text-gray-700">
        <div className="flex gap-3 items-center">
          <span className="font-medium dark:text-white">Booking Date:</span>
          <div className="flex gap-2 items-center">
            <span className='font-[500] dark:text-white'>{new Date(appointment?.date).toDateString()}</span>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <span className="font-medium dark:text-white">Booking Time : </span>
          <div className="flex gap-2 items-center">
            <span className='font-[500] dark:text-white'>{appointment?.time}</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <span className="font-medium ">Consultation Type:</span>
          <div className="flex gap-2 items-center">
            <Video className="w-4 h-4" />
            <span className="capitalize font-[500]" >{appointment?.type || "Video Consulting"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSummaryCard;
