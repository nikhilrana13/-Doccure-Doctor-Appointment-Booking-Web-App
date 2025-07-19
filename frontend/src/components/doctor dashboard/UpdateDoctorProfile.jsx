import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SetUser } from '@/redux/AuthSlice';
import { Loader2 } from 'lucide-react';

const UpdateDoctorProfile = () => {
  const [Doctor, SetDoctor] = useState({})
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const profilepic = watch("profilepic")
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/profile/${user?._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }, withCredentials: true
        })

        if (response.data) {
          SetDoctor(response?.data?.doctor)
        }
      } catch (error) {
        console.log("failed to fetch profile", error)
      }
    }
    fetchprofile();
    // console.log("doctor", Doctor);
  }, [user?._id])

  useEffect(() => {
    if (Doctor?._id) {
      setValue("phone", Doctor?.phone);
      setValue("gender", Doctor?.userId?.gender);
      setValue("specialization", Doctor?.specialization);
      setValue("experience", Doctor?.experience);
      setValue("bio", Doctor?.bio);
      setValue("feesPerConsultation", Doctor?.feesPerConsultation);
      setValue("location", Doctor?.location);
      setValue("active", Doctor?.active);
      setValue("name", Doctor?.userId?.name);
      setValue("email", Doctor?.userId?.email)
    }
  }, [Doctor, setValue])

  const onSubmit = async (data) => {
    //  alert("form submit")
    const formdata = new FormData();
    formdata.append("name", data?.name);
    formdata.append("email", data?.email)
    formdata.append("phone", data?.phone);
    formdata.append("gender", data?.gender);
    formdata.append("specialization", data?.specialization);
    formdata.append("experience", data?.experience);
    formdata.append("bio", data?.bio);
    formdata.append("feesPerConsultation", data?.feesPerConsultation);
    formdata.append("location", data?.location);
    formdata.append("active", data?.active);
    if (profilepic && profilepic.length > 0) {
      formdata.append("profilepic", profilepic[0]);
    } else {
      console.log("No profile picture selected");
    }
    // for (let pair of formdata.entries()) {
    //   console.log(pair[0] + "," + pair[1])
    // }
    try {
      setloading(true)
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/updateprofile`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data"
        }, withCredentials: true
      })
      if (response.data) {
        toast.success(response?.data?.message || "profile updated successfully");
        // console.log(response?.data?.user)
        SetDoctor(response?.data?.updateddoctor)
        dispatch(SetUser(response?.data?.user))
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
          <h2 className="mb-5 text-4xl font-bold text-blue-900">Update Profile</h2>
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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("name")}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              {...register("email")}
            />
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
              {...register("location")}
            />
          </div>

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
              {...register("experience")}
            />
          </div>

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
              {...register("specialization")}
            />
          </div>

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
              {...register("bio")}
            />
          </div>

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
              {...register("feesPerConsultation")}
            />
          </div>

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


          <div className="flex justify-end space-x-4">
            <button
              type="submit"
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
        </form>
      </div>
    </div>
  );
}

export default UpdateDoctorProfile;
