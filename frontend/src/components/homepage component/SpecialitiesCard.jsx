import React from 'react';

const SpecialitiesCard = ({image,title}) => {
  return (
    <div className='border w-full rounded-md p-4 md:w-[200px] h-[200px] flex flex-col gap-3 justify-center items-center'>
            <span className=' p-5 border bg-[#DFEBFF]  rounded-full '>
                <img src={image} className='w-12 h-12 ' alt="" />
            </span>
        <div>
            <p className='text-[#012047] dark:text-white font-[500]'>{title}</p>
        </div>
    </div>
  );
}

export default SpecialitiesCard;
