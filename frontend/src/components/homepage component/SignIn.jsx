import React from 'react';
import signupbanner from  '../../assets/login-banner.webp'
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SetUser } from '@/redux/AuthSlice';

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(false);
    const {register,handleSubmit,formState:{errors}}=useForm();

    const onSubmit = async(data)=>{
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,data,{withCredentials:true});
            if(response?.data){
                if(response?.data?.user?.role === "patient"){
                toast.success(response?.data?.message);
                localStorage.setItem("token",response?.data?.token);
                dispatch(SetUser(response?.data?.user));
                navigate("/patient/dashboard");
                }else{
                    toast.success(response?.data?.message);
                    localStorage.setItem("token",response?.data?.token);
                    dispatch(SetUser(response?.data?.user));
                    navigate("/doctor/doctordashboard");
                }
               
            }
        } catch (error) {
            console.log("failed to login",error);   
            toast.error(error?.response?.data?.message);
            setTimeout(() => {
                setLoading(false);
            }, 1000);      
        }
    }
  return (
    <div>
                <div className='flex flex-col md:flex-row justify-center items-center '>
                    <div className='sm:w-1/2 flex items-center justify-center'>
                    <img src={signupbanner} lazyloading="lazy" className='w-full md:w-[500px]' alt="" />
                    </div>
                    {/* form */}
                    <div className='sm:w-1/2 '>
                            <section className="dark:bg-gray-900 rounded-md">
                            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Welcome ! Back to DocCure
                                        </h1>
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6" action="#">
                                            <div>
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  placeholder="name@company.com" {...register("email", { required: true })} />
                                            </div>
                                            {errors.email && <span className="text-red-500">Email is required</span>}
                                            <div>
                                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("password", { required: true })} />
                                            </div>
                                            {errors.password && <span className="text-red-500">Password is required</span>}
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                                </div>
                                            </div>
                                            <button type="submit" className="px-5 w-full py-2.5 rounded-full text-white text-sm cursor-pointer tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-400">
                                                {loading ? <Loader2 className="animate-spin mx-auto w-5 h-5 text-white" /> : "Sign In"}
                                            </button>
                                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                                Don't have an account? <NavLink to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Signup here</NavLink>
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
    
                    </div>
                    
                </div>
            </div>
  );
}

export default SignIn;
