import React from 'react';
import { Stethoscope, ArrowRight } from "lucide-react";

const JoinAsDoctor = () => {
  return (
        <section className="bg-white dark:bg-black py-16">
      <div className="max-w-6xl mx-auto  px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left side content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-[#012047] mb-4">
            Are You a Doctor?
          </h2>
          <p className="text-[#4F6582] dark:text-white text-lg font-medium mb-6">
            Join our platform and reach thousands of patients looking for qualified medical professionals like you.
          </p>

          <ul className="space-y-3 text-[#465D7C] dark:text-white font-[500]">
            <li className="flex items-center gap-2">
              <Stethoscope className="text-[#0B92ED]" size={20} />
              List your profile for free
            </li>
            <li className="flex items-center gap-2">
              <Stethoscope className="text-[#0B92ED]" size={20} />
              Manage appointments seamlessly
            </li>
            <li className="flex items-center gap-2">
              <Stethoscope className="text-[#0B92ED]" size={20} />
              Expand your patient base
            </li>
          </ul>
          
            <button className="mt-6 inline-flex items-center gap-2 bg-[#0B92ED] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#057fd2] transition">
            Join Today
            <ArrowRight size={18} />
          </button>
         
        </div>

        {/* Right side image */}
        <div className="flex-1">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png"
            alt="Join as Doctor"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>

  );
}

export default JoinAsDoctor;
