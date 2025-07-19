import React from 'react';
import SpecialitiesCard from './SpecialitiesCard';


const Specialitiescarddata = [
    {
        id:0,
        title:"Cardiologist",
        image:"/specialitiesimages/cardiology.svg",
    },
    {
        id:1,
        title:"Dentist",
        image:"/specialitiesimages/dentist.svg",
    },{
        id:2,
        title:"Neurologist",
        image:"/specialitiesimages/neurology.svg",
    },{
        id:3,
        title:"Orthopedic",
        image:"/specialitiesimages/ortho.svg",
    },{
        id:4,
        title:"Urologist",
        image:"/specialitiesimages/urology.svg",
    },
    {
        id:5,
        title:"Ophthalmologist",
        image:"/specialitiesimages/oth.svg",
    },
    // {
    //     id:6,
    //     title:"Cardiologist",
    //     image:"/specialitiesimages/cardiology.svg",
    // },
]
const Specialities = () => {
  return (
    <div className='flex flex-col  w-full py-10'>
        <h3 className='text-[2rem] dark:text-white text-[#012047] text-start font-bold'>Specialities</h3>
        {/* speciality cards */}
        <div className='flex gap-3 mt-10  justify-center items-center flex-wrap'>
            {
                Specialitiescarddata.map((item)=>{
                    return(
                        <SpecialitiesCard key={item.id} title={item.title} image={item.image} />
                    )
                })
            }
        </div>
    </div>
  );
}

export default Specialities;
