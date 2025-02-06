"use client";

import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HotelCard from "./HotelCard";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HotelList(props: any) {
	const swiperRef = useRef<any>(null);

	return (
		<div className="container relative mx-auto max-w-6xl py-12">
			<h2 className="mb-6 font-semibold text-2xl text-gray-800">
				{props.title}
			</h2>

			{/* Navigation Buttons with Hover Effect */}
			<button
				onClick={() => swiperRef.current?.slidePrev()}
				className="-left-3 -translate-y-1/2 absolute top-1/2 z-10 hidden transform rounded-full bg-white p-3 shadow-md transition-transform duration-300 hover:scale-110 hover:bg-gray-100 md:block"
			>
				<ChevronLeft size={24} className="text-gray-700" />
			</button>

			<button
				onClick={() => swiperRef.current?.slideNext()}
				className="-right-3 -translate-y-1/2 absolute top-1/2 z-10 hidden transform rounded-full bg-white p-3 shadow-md transition-transform duration-300 hover:scale-110 hover:bg-gray-100 md:block"
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
				{props.hotels.map((hotel: any) => (
					<SwiperSlide key={`list_${hotel.uuid}`}>
						<HotelCard {...hotel} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
