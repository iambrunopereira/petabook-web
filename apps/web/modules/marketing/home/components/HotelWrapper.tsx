"use client";
import { hotelList } from "@marketing/db/hotels";
import HotelCard from "@marketing/home/components/HotelCard";
import HotelsMap from "@marketing/home/components/HotelsMap";
import { useEffect, useState } from "react";

export default function HotelsMapPage() {
	const [visibleHotels, setVisibleHotels] = useState(hotelList); // ✅ Track visible hotels
	const [showList, setShowList] = useState(false); // ✅ Toggle hotel list on mobile

	/* useEffect(() => {
		console.log(visibleHotels);
	}, [visibleHotels]); */
	return (
		<div className="container mt-20 mb-5 flex h-[90vh] flex-col md:flex-row">
			<button
				className="m-2 rounded-lg bg-blue-600 p-3 text-white md:hidden"
				onClick={() => setShowList(!showList)}
			>
				{showList ? "Ver mapa" : "Ver hoteis"}
			</button>

			<div
				className={`custom-scrollbar absolute z-10 w-full overflow-y-auto border-gray-200 border-r p-4 transition-transform md:relative md:w-1/3 ${
					showList ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0`}
			>
				<h2 className="mb-4 font-semibold text-lg">Hoteis disponiveis</h2>

				<div className="space-y-4">
					{visibleHotels.length === 0 ? (
						<p className="text-gray-500">Não temos hoteis disponiveis.</p>
					) : (
						visibleHotels.map((hotel) => (
							<HotelCard key={`hotel_${hotel.uuid}`} {...hotel} />
						))
					)}
				</div>
			</div>

			{/* Right: Map Section */}
			<div className="h-full w-full pl-3 md:w-2/3">
				<HotelsMap hotels={hotelList} setVisibleHotels={setVisibleHotels} />
			</div>
		</div>
	);
}
