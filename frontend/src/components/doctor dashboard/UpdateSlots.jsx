import React from 'react';import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';


const UpdateSlots = () => { 
  const [loading,setloading] = useState(false)
   const [dateTime, setDateTime] = useState(new Date());
    const [slots, setSlots] = useState([]);
    // add slots 
    const handleAddSlot = () => {
      if (!slots.find(slot => slot.getTime() === dateTime.getTime())) {
        setSlots([...slots, dateTime]);
      }
    }
    // remove slots
    const RemoveSlot = (indexToRemove) => {
      setSlots(slots.filter((_, i) => i !== indexToRemove))
    }
    // console.log("slots",slots)
  
    //  function to convert date and time in objects 
    const formattedSlots = slots.map((slot) => {
      const d = new Date(slot)
      const date = d.toISOString().split("T")[0];
      const time = d.toTimeString().split(" ")[0];
      return { date, time };
    })

    const handleUpdateSlots = async()=>{
       if(slots.length === 0){
         toast.error("Please select at least one slot")
         return;
       }
      try {
        setloading(true)
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/updateslots`,{
          availableSlots:formattedSlots},{
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            },withCredentials:true
          })
          if(response.data){
            toast.success(response?.data?.message || "Slots update successfully")
            // console.log("response",response?.data)
          }
      } catch (error) {
        console.log("failed to update slots",error)
        toast.error(error?.response?.data.message || "Something went wrong")
      }finally{
        setTimeout(() => {
          setloading(false);
        }, 500);
      }
    }

  return (
      <div>
       <div className='border-b p-3'>
        <h1 className='text-[1.5rem] font-[700]'>Update Slots and Timings </h1>
      </div>
      {/*select slots */}
      <div className='flex flex-col mt-10 p-2 gap-2'> 
         <div className='border rounded-md flex flex-col gap-2 p-3'>
                    <h2 className='text-[1rem] font-[500]'>📅 Select Slots</h2>
                    <DateTimePicker
                      className="p-2 w-full"
                      onChange={setDateTime}
                      value={dateTime}
                      disableClock={false}
                      format="y-MM-dd h:mm a"
                      minDate={new Date()}
                      placeholder="Select Date and Time"
                    />
                    <button
                      type="button"
                      onClick={handleAddSlot}
                      className="w-fit mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      + Add Slot
                    </button>
                  </div>
                  {/* Show Selected Slots */}
                  <div className="mt-4 space-y-2">
                    {slots.length > 0 ? (
                      slots.map((slot, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center border bg-gray-100 dark:bg-black p-2 rounded-md"
                        >
                          <span>{slot.toLocaleString()}</span>
                          <button
                            type="button"
                            onClick={() => RemoveSlot(index)}
                            className="text-red-500 hover:underline text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm p-2 text-gray-500">No slots selected yet.</p>
                    )}
                  </div>
                  <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleUpdateSlots}
              className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
            >              
              {
                loading ? (
                 <Loader2 className="animate-spin mx-auto w-5 h-5 text-white" />
                ):(
                  "Save changes"
                )
              }

            </button>
          </div>
       
      </div>
    </div>
  );
}

export default UpdateSlots;
