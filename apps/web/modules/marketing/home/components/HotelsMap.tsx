"use client";
//@ts-ignore
import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import "leaflet/dist/leaflet.css";
import HotelCard from "@marketing/home/components/HotelCard";
import HotelMarkerSVG from "@marketing/home/components/HotelMarkerSVG";
import PetClusterIcon from "@marketing/home/components/PetClusterIcon";
import { regionList } from "@marketing/db/regions";
import { Star } from "lucide-react";
import { Hotel } from "@marketing/db/hotels";
import Image from "next/image";

// Dynamically import react-leaflet components (prevents SSR issues)
const MapContainer = dynamic(
	() => import("react-leaflet").then((m) => m.MapContainer),
	{ ssr: false },
);
const TileLayer = dynamic(
	() => import("react-leaflet").then((m) => m.TileLayer),
	{ ssr: false },
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
	ssr: false,
});
const MarkerClusterGroup = dynamic(
	() => import("react-leaflet-markercluster"),
	{ ssr: false },
) as any;

// Prevent SSR for Leaflet by conditionally requiring it
const L = typeof window !== "undefined" ? require("leaflet") : null;

interface HotelsMapProps {
	hotels: Hotel[];
	setVisibleHotels: any;
}
function SmallHotelCard({
	hotel,
	closeHandler,
}: {
	hotel: Hotel;
	closeHandler: any;
}) {
	const router = useRouter();

	return (
		<div className="flex items-center gap-2 p-4 border rounded-md shadow-sm bg-white flex-wrap">
			{/* Image container */}
			<div className="w-20 h-20 flex-shrink-0">
				<Image
					src={hotel.images ? hotel?.images[0] : ""}
					alt={hotel.name ?? ""}
					width={80}
					height={80}
					className="object-cover rounded-md w-full h-full"
				/>
			</div>
			{/* Info container */}
			<div className="flex-1">
				<h3 className="text-xl font-semibold">{hotel.name}</h3>
				<p className="text-sm text-gray-600">{hotel.location}</p>

				<div className="flex items-center my-2">
					{Array.from({ length: 5 }, (_, index) => (
						<Star
							key={index}
							size={16}
							className={
								index < (hotel.rating ?? 0)
									? "text-yellow-500"
									: "text-gray-300"
							}
						/>
					))}
				</div>
				{/* A placeholder description. Replace with hotel.description if available */}
				<p className="text-xs text-gray-500">{hotel.shortDescription}</p>
			</div>
			{/* "See Details" button */}
			<div className="h-20 flex justify-around flex-col items-start max-sm:w-full">
				<button
					onClick={() => closeHandler(null)}
					className="absolute right-2 top-0 text-2xl text-gray-600 hover:text-gray-800"
				>
					&times;
				</button>
				{hotel.prices != 0 && (
					<span className="font-semibold text-blue-600 text-lg">
						€{hotel.prices}/noite
					</span>
				)}
				<button
					onClick={() => router.push(`/hotels/${hotel.uuid}`)}
					className="bg-blue-600 -mb-1 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-md max-sm:w-full"
				>
					Ver hotel
				</button>
			</div>
		</div>
	);
}

export default function HotelsMap({
	hotels,
	setVisibleHotels,
}: HotelsMapProps) {
	const [mapLoaded, setMapLoaded] = useState(false);
	const [map, setMap] = useState<any>(null);
	// New state: holds the hotel selected by clicking a marker.
	const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const locationQuery = searchParams.get("location");

	// Compute the initial center and zoom based on the URL parameter.
	const { initialCenter, initialZoom } = useMemo(() => {
		let center: [number, number] = [38.7169, -9.1399]; // default center
		let zoom = 6; // default zoom
		if (locationQuery) {
			const foundRegion = regionList.find(
				(region) => region.region.toLowerCase() === locationQuery.toLowerCase(),
			);
			if (foundRegion) {
				center = foundRegion.center;
				// For a city, zoom in more; for a region, use a less aggressive zoom.
				zoom = foundRegion.type === "city" ? 12 : 10;
			}
		}
		return { initialCenter: center, initialZoom: zoom };
	}, [locationQuery]);

	// Mark the map as loaded when the component mounts on the client.
	useEffect(() => {
		setMapLoaded(true);
	}, []);

	// Update the map view when the map instance, center, or zoom changes.
	useEffect(() => {
		if (map && initialCenter && initialZoom) {
			console.log("Setting map view to", initialCenter, initialZoom);
			map.setView(initialCenter, initialZoom);
		}
	}, [map, initialCenter, initialZoom]);

	// This function filters hotels based on the map's current bounds.
	const updateVisibleHotels = () => {
		console.log("updateVisibleHotels fired");
		if (!map) return;
		const bounds = map.getBounds();
		console.log("Current map bounds:", bounds);
		const filteredHotels = hotels.filter((hotel) => {
			const hotelLatLng = L.latLng(hotel.lat, hotel.lng);
			return bounds.contains(hotelLatLng);
		});
		console.log("Filtered hotels:", filteredHotels);
		setVisibleHotels(filteredHotels);
	};

	// When the map is created, attach the "moveend" event listener.
	const handleMapCreated = (mapInstance: any) => {
		console.log("Map created:", mapInstance);
		setMap(mapInstance);
		mapInstance.on("moveend", () => {
			console.log("moveend event fired");
			updateVisibleHotels();
		});
		// Initial update once the map is created.
		updateVisibleHotels();
	};

	if (!mapLoaded || !L) {
		return (
			<div className="h-full w-full bg-gray-200 animate-pulse">
				Loading Map...
			</div>
		);
	}

	// Helper function to create a custom marker icon.
	const createHotelIcon = (hotelId: string) =>
		L.divIcon({
			className: "custom-marker",
			html: HotelMarkerSVG({ hover: true }),
			iconSize: [40, 50],
			iconAnchor: [20, 50],
			popupAnchor: [0, -50],
		});

	return (
		// Parent container with relative positioning so the overlay is positioned correctly.
		<div className="relative h-full w-full">
			<div className="relative h-full w-full">
				<MapContainer
					center={initialCenter}
					zoom={initialZoom}
					className="h-full w-full rounded-lg"
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					/>

					{hotels.map((hotel) => (
						<Marker
							key={hotel.uuid}
							position={[hotel.lat ?? 0, hotel.lng ?? 0]}
							icon={createHotelIcon(hotel.uuid)}
							eventHandlers={{
								// When a marker is clicked, show the bottom overlay with the hotel card.
								click: () => {
									console.log("Marker clicked for hotel", hotel);
									setSelectedHotel(hotel);
								},
							}}
						/>
					))}
				</MapContainer>

				{/* Bottom overlay to display the selected hotel's details.
          The overlay is absolutely positioned at the bottom with a high z-index so that it appears on top of the map.
      */}
			</div>

			{selectedHotel && (
				<div className="absolute bottom-2 left-0 right-0 z-[998] m-8">
					<SmallHotelCard
						hotel={selectedHotel}
						closeHandler={setSelectedHotel}
					/>
				</div>
			)}
		</div>
	);
}
