const AppointmentCardShimmer = () => {
  return (
    <div className="border bg-white rounded-md p-5 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-5 flex-wrap justify-between">
        {/* Profile + Name */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-300" />
          <div className="flex flex-col gap-2">
            <div className="w-32 h-4 bg-gray-300 rounded" />
            <div className="w-24 h-4 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Date + Type */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <div className="w-40 h-4 bg-gray-300 rounded" />
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="w-16 h-4 bg-gray-300 rounded" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>
        </div>

        {/* Email + Phone */}
        <div className="flex flex-col gap-2">
          <div className="w-36 h-4 bg-gray-300 rounded" />
          <div className="w-24 h-4 bg-gray-300 rounded" />
        </div>

        {/* Cross Icon */}
        <div className="p-3 rounded-full bg-gray-300 w-10 h-10" />
      </div>
    </div>
  );
};

export default AppointmentCardShimmer;
