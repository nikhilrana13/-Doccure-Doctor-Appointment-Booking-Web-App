import Navbar from '@/components/homepage component/Navbar';
import React, { useEffect,useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, HomeIcon, Loader2 } from 'lucide-react';
import DoctorCard from '@/components/homepage component/DoctorCard';
import Footer from '@/components/homepage component/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '@/redux/DoctorsSlice';

const FindDoctors = () => {
    const { Doctors, loading, error } = useSelector((state) => state.Doctor)
    const [selectedSpeciality, setSelectedSpeciality] =useState([]);
    const [selectedprice, setSelectedprice] = useState(5000);
    const [filterdoctors, setFilterdoctors] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
             dispatch(fetchDoctors());
    }, [dispatch]);

    const handlefilterspeciality = (e)=>{
        const value = e.target.value;
        setSelectedSpeciality((prev)=> {
            return (prev.includes(value) ? prev.filter((item)=>item !== value) : [...prev,value]);
        });
           
    }
    const handlefilterprice = (e)=>{
        const value = e.target.value;
        setSelectedprice(Number(value));
    }
   useEffect(()=>{
      let filtered = Doctors;
    //   filter speciality
      if(selectedSpeciality.length > 0 ){
        filtered = filtered.filter((doctor)=> selectedSpeciality.some((speciality)=>speciality.toLowerCase() === doctor.specialization.toLowerCase()));
      }
    //   filter price
      if(selectedprice){
        filtered = filtered.filter((doctor)=> doctor.feesPerConsultation <= selectedprice);
      }
      setFilterdoctors(filtered);
   },[selectedSpeciality,selectedprice,Doctors])    
//    console.log("doctors",Doctors)

    return (
        <div>
            <Navbar />
            <div className='flex shadow-md rounded-md bg-[#F9FBFF] dark:bg-black flex-col p-3 md:p-8 items-center gap-3 justify-center'>
                <div className='flex gap-3'>
                    <NavLink to="/">
                        <span><HomeIcon className='text-[#0B92ED] dark:text-white' /></span>
                    </NavLink>
                    <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
                    <span className='text-[#465D7C] dark:text-white'>Doctor</span>
                    <span> <ArrowRight className='text-[#465D7C] dark:text-white' /> </span>
                    <span className='text-[#012047] dark:text-white'>Doctor List</span>

                </div>
                <h3 className='text-[#012047] dark:text-white font-[700] text-[1.5rem] md:text-[2rem]'>Doctor List</h3>
            </div>
            {/* doctors cards */}
            <div className='flex w-full flex-col lg:flex-row  min-h-screen  gap-1 sm:p-5 p-2 sm:gap-5 '>
                {/* <!-- left side --> */}
                <div className='left lg:w-[20%] w-full sm:p-5 p-2' >
                    <p className="font-bold text-[1.4rem]">Filter Doctors</p>
                    <hr className="mt-2" />

                    {/* filter speciality */}
                    <div className="rounded-md  pl-5 py-3 mt-3 text-black dark:text-white">
                        <p className="mb-3 text-[1.2rem] font-bold">Specialities</p>
                        {["Cardiologist", "Dentistry", "Dermatologist", "Emergency Medicine", "Gynecology", "Orthopedics", "Pediatrics", "psychologist", "Radiology", "Surgery", "Dentist", "Neurologist"].map((speciality, index) => (
                            <p key={index} className="flex gap-2">
                                <input onChange={handlefilterspeciality} value={speciality.toLowerCase()} type="checkbox" className="mt-1" />
                                <span>{speciality}</span>
                            </p>
                        ))}
                    </div>
                    <hr className="mt-2" />
                    {/* fiter price */}
                    <div className="rounded-md  pl-5 py-3 mt-3 text-black dark:text-white">
                        <p className="mb-3 text-[1.2rem] font-bold">Pricing</p>
                        <input onChange={handlefilterprice} value={selectedprice} type="range" min="100" max="10000" className="w-full mt-2" />
                        <span className='text-[1.2rem] text-[#012047] dark:text-white'> ₹ 100 - ₹ {selectedprice}</span>

                    </div>

                </div>
                {/* <!-- right side --> */}
                <div className='right lg:w-[80%] justify-center items-center flex  p-3 w-full '>
                    {
                        loading ? (
                            <>
                                <div className='flex justify-center items-center mt-10'>
                                    <Loader2 className='animate-spin w-14 h-14 text-[#012047] dark:text-white text-[2rem]' />
                                </div>
                            </>
                        ):filterdoctors?.length > 0 ? (
                               <div class="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 mb-12">
                                  {
                                    filterdoctors.map((doctor)=>{
                                        return (
                                                <DoctorCard key={doctor._id} doctor={doctor} />
                                        )
                                    })
                                  }
                                 </div>

                        ):error  ? (
                        <p>{error}</p>
                    ):(
                        <div className='flex justify-center items-center mt-10'>
                            <p className='text-[#012047] dark:text-white text-[1.2rem]'>No doctors found</p>
                        </div>
                    )
                    }

                 
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FindDoctors;
