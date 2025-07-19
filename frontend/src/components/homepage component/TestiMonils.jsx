
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Star } from "lucide-react";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    name: "Amit Sharma",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "The platform made it incredibly easy to find a reliable doctor nearby. I booked an appointment in just 2 minutes!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Verma",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "Great experience! The consultation was smooth, and I got my prescription instantly after the video call.",
    rating: 4,
  },
  {
    id: 3,
    name: "Rahul Mehta",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    feedback:
      "I was able to find a specialist for my father and got an appointment for the very next day. Highly recommended!",
    rating: 5,
  },
  {
  id: 4,
  name: "Neha Singh",
  image: "https://randomuser.me/api/portraits/women/22.jpg",
  feedback: "Very easy to use and book. Will use again for sure!",
  rating: 5,
},
{
  id: 5,
  name: "Ankita Kapoor",
  image: "https://randomuser.me/api/portraits/women/22.jpg",
  feedback: "Very easy to use and book. Will use again for sure!",
  rating: 5,
}
];
const TestiMonils = () => {
  return (
     <section className="py-16 bg-[#F6FAFF] dark:bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center font-bold dark:text-white text-[#012047] mb-12">
          What Our Patients Say
        </h2>

        <Swiper
         modules={[Autoplay]}
          spaceBetween={30}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white  p-6 rounded-xl h-full flex flex-col  min-h-[200px] gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-[#012047]">
                      {t.name}
                    </h4>
                    <div className="flex gap-1 text-yellow-400">
                      {Array(t.rating)
                        .fill()
                        .map((_, i) => (
                          <Star key={i} fill="currentColor" className="w-4 h-4" />
                        ))}
                    </div>
                  </div>
                </div>
                <p className="text-[#465D7C] text-sm font-[500]">{t.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TestiMonils;
