"use client";

import { useRef } from "react";
import HotelCard from "./HotelCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function HotelList(props: any) {
  const swiperRef = useRef<any>(null);

  return (
    <div className="container max-w-6xl mx-auto py-12 relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{ props.title }</h2>

      {/* Navigation Buttons with Hover Effect */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hidden md:block transition-transform duration-300 hover:scale-110 hover:bg-gray-100"
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-3 rounded-full z-10 hidden md:block transition-transform duration-300 hover:scale-110 hover:bg-gray-100"
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>

      {/* Swiper Carousel with Infinite Looping */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        loop={true} // ✅ Enables infinite looping
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="pb-8"
      >
        {props.hotels.map((hotel) => (
          <SwiperSlide key={hotel.id}>
            <HotelCard {...hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}