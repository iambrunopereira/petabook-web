"use client";

import { useRef } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HotelImageCard(props: any) {
	const swiperRef = useRef<any>(null);

	return (
		<div className=" relative mx-auto">
			{/* Navigation Buttons with Hover Effect */}
			<button
				onClick={() => swiperRef.current?.slidePrev()}
				className="-translate-y-1/2 absolute top-1/2 left-2 z-10 transform rounded-full bg-white p-3 shadow-md transition-transform duration-300 hover:scale-110 hover:bg-gray-100 md:block"
			>
				<ChevronLeft size={24} className="text-gray-700" />
			</button>

			<button
				onClick={() => swiperRef.current?.slideNext()}
				className="-translate-y-1/2 absolute top-1/2 right-2 z-10 transform rounded-full bg-white p-3 shadow-md transition-transform duration-300 hover:scale-110 hover:bg-gray-100 md:block"
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
					640: { slidesPerView: 1 },
					1024: { slidesPerView: 1 },
					1280: { slidesPerView: 1 },
				}}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				className="pb-8"
			>
				{props.images.map((image: any, index: number) => (
					<SwiperSlide key={`list_${index}_${props.uuid}_hotel_card`}>
						<Image
							src={image}
							alt={props.title}
							width={300}
							height={200}
							max-width={300}
							max-height={200}
							className="aspect-square w-full rounded-lg "
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
