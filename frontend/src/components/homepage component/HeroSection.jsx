import { NavLink } from "react-router-dom";
import heroimg from '../../assets/heroimg.webp'

const HeroSection = () => {
    return (
        <section className="py-10">
            <div className="max-w-6xl mx-auto  px-4 flex flex-col gap-5 md:flex-row items-center justify-between">
                {/* <!-- Left Side Content Here --> */}
                <div className="md:w-1/2  ">
                    <h1 className="text-4xl md:text-5xl dark:text-white font-[700] text-[#012047] leading-tight">
                        <span className="block">
                            Consult <span className="text-[#0B92ED]">Best Doctors</span>
                        </span>
                        <span className="block mt-4">
                            Your Nearby Location.
                        </span>
                    </h1>
                    <p className="text-[1.5rem] font-[500] text-[#4F6582] mt-4 max-w-lg">
                        Embark on your healing journey with Doccure
                    </p>
                    <div className="mt-8">
                        <NavLink to="/finddoctors" className="bg-[#012047] hover:bg-[#0B92ED] text-white py-3 px-6 rounded-full mr-4">
                            Book an Appointment
                        </NavLink>
                    </div>

                </div>
                {/* <!-- Right Side Content Here */}
                <div className="md:w-1/2 mt-10 md:mt-0">
                    <img src={heroimg} className='rounded-lg' alt="Doctor image" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
