import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '@/redux/AuthSlice';

const CreateProfile = () => {
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);
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
  const onSubmit = async (data) => {
    //  alert("form submit")
    const formdata = new FormData();
    formdata.append("phone", data?.phone);
    formdata.append("gender", data?.gender);
    formdata.append("specialization", data?.specialization);
    formdata.append("experience", data?.experience);
    formdata.append("bio", data?.bio);
    formdata.append("feesPerConsultation", data?.feesPerConsultation);
    formdata.append("location", data?.location);
    formdata.append("active", data?.active);
    formdata.append("profilepic", data?.profilepic?.[0]);
    formdata.append("availableSlots", JSON.stringify(formattedSlots))

    for (let pair of formdata.entries()) {
      console.log(pair[0] + "," + pair[1])
    }
    try {
      setloading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/createprofile`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }, withCredentials: true
      })
      if (response.data) {
        toast.success(response?.data?.message || "profile created successfully");
        // console.log(response?.data?.user)
        dispatch(SetUser(response?.data?.user))
        reset();
        navigate("/doctor/doctordashboard");
      }
    } catch (error) {
      console.log("error in creating profile", error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setTimeout(() => {
        setloading(false)
      }, 500);
    }
  }
  return (
    <div className="font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between mb-5 items-start">
          <h2 className="mb-5 text-4xl font-bold text-blue-900">Create Profile</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-center">
            <div>
              <img
                src={user?.profilepic || "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3NMWlJ2O7OqJz2UcJwW.jpg"}
                alt="Profile Picture"
                className="rounded-full w-32 h-32 mx-auto border-4 border-indigo-800 mb-4 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
              />
              <input
                type="file"
                name="profilepic"
                id="profilepic"
                hidden
                accept="image/*"
                {...register("profilepic")}
              />
              <label htmlFor="profilepic" className="inline-flex cursor-pointer items-center">
                <svg
                  data-slot="icon"
                  className="w-5 h-5 text-blue-700"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                  ></path>
                </svg>
              </label>
            </div>
          </div>


          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="phone"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("phone")}
            />
          </div>
          {errors.phone && <p className="text-red-500">Phone Number is required</p>}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              type="text"
              id="gender"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("location", { required: true })}
            />
          </div>
          {errors.location && <p className="text-red-500">Location is required</p>}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Experience
            </label>
            <input
              type="text"
              id="experience"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("experience", { required: true })}
            />
          </div>
          {errors.experience && <p className="text-red-500">Experience is required</p>}
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700"
            >
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("specialization", { required: true })}
            />
          </div>
          {errors.specialization && <p className="text-red-500">Specialization is required</p>}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <input
              type="text"
              id="bio"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("bio", { required: true })}
            />
          </div>
          {errors.bio && <p className="text-red-500">Bio is required</p>}
          <div>
            <label
              htmlFor="feesPerConsultation"
              className="block text-sm font-medium text-gray-700"
            >
              Fees per Consultation
            </label>
            <input
              type="number"
              id="feesPerConsultation"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("feesPerConsultation", { required: true })}
            />
          </div>
          {errors.feesPerConsultation && <p className="text-red-500">Fees per Consultation is required</p>
          }
          <div>
            <label
              htmlFor="active"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select id="active" {...register("active", { required: true })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              <option value="active">Active</option>
              <option value="inactive">InActive</option>
            </select>
          </div>
          {/* select available slots time and date */}
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
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
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
              type="submit"
              className="px-4 py-2 bg-indigo-800 text-white rounded-lg hover:bg-indigo-700"
            >

              {
                loading ? "Creating" : "Save Changes"
              }

            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
