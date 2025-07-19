import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import BookingSummaryCard from './BookingSummaryCard';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { appointmentDetails, paymentDetails, Doctor } = location.state || {};
  // console.log("appointment details",appoinmentDetails,paymentDetails,Doctor)
  // console.log("Appointment:", appointmentDetails);
  // console.log("Payment:", paymentDetails);
  // console.log("Doctor:", Doctor);
  const onSubmit = () => {
    navigate("/success", {
      state: {
        appointmentDetails,
        Doctor
      }
    })
  }
  // redirect after delay if data is missing
  useEffect(() => {
    if (!appointmentDetails || !paymentDetails || !Doctor) {
      const timer = setTimeout(() => {
        toast.error("please select a doctor first")
        navigate("/finddoctors")
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [appointmentDetails, paymentDetails, Doctor, navigate])
  // Show loading text if no data
  if (!appointmentDetails || !Doctor || !paymentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg"> <Loader2 className='animate-spin w-10 h-10' /></p>
      </div>
    );
  }
  return (
    <div className='mt-14 p-2'>
      <div className=' p-5 mt-14 flex w-full flex-col gap-5 md:flex-row justify-between'>
        {/* left side */}
        <div className='w-full md:w-1/2'>
          <BookingSummaryCard doctor={Doctor} appointment={appointmentDetails} />
        </div>
        {/* right side */}
        <div className='border w-full md:w-1/2 rounded-md p-5'>
          <div className="mt-6 border p-3  ">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Consulation fees
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ₹ {paymentDetails?.consulationFees || "0"}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Booking fees
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ₹ {paymentDetails?.bookingFess || "0"}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ₹{paymentDetails?.totalfees || 0}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="space-y-3 flex justify-end mt-5">
            <button
              type="submit"
              onClick={onSubmit}
              className="px-5 py-2.5 rounded-md text-white text-sm cursor-pointer tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-400"
            >
              Proceed to Payment
            </button>
          </div>


        </div>

      </div>
    </div>

  );
}

export default Payment;
