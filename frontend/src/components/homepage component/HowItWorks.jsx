import React from 'react';
import { Search, User, CalendarCheck, Stethoscope } from "lucide-react";
import doctor2 from '../../assets/doctor2.webp'

const HowItWorks = () => {
    const steps = [
    {
      id: 1,
      title: "Search Doctor",
      description: "Find the best doctors in your area with just a few clicks.",
      icon: <Search className="w-8 h-8 text-[#0B92ED]" />,
    },
    {
      id: 2,
      title: "Check Doctor Profile",
      description: "View detailed profiles with ratings, experience, and reviews.",
      icon: <User className="w-8 h-8 text-[#0B92ED]" />,
    },
    {
      id: 3,
      title: "Schedule Appointment",
      description: "Book appointments easily from the doctor’s available slots.",
      icon: <CalendarCheck className="w-8 h-8 text-[#0B92ED]" />,
    },
    {
      id: 4,
      title: "Get Your Solution",
      description: "Consult and receive expert medical advice at your convenience.",
      icon: <Stethoscope className="w-8 h-8 text-[#0B92ED]" />,
    },
  ];
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="md:w-1/2  w-full">
          <img
            src={doctor2} // 
            alt="Doctor Illustration"
            className="w-full h-auto rounded-full shadow-lg"
          />
        </div>
        {/* Right Steps */}
        <div className="md:w-1/2 w-full border-2 rounded-md shadow-md p-10 flex flex-col gap-6">
          <h2 className="text-[2rem] md:text-[2.5rem] dark:text-white font-bold text-[#012047] mb-4">
            How It Works
          </h2>
          {steps.map((step) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow text-[#0B92ED]">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold dark:text-white text-[#012047]">{step.title}</h3>
                <p className="text-sm text-[#465D7C] dark:text-white font-[500]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;


