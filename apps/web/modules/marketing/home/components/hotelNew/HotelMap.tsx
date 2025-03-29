// components/HotelMap.tsx
"use client";

import type { Hotel } from "@marketing/db/hotels";
import { getHotelMarkerSvg } from "@marketing/home/components/HotelMarkerSVG";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
	width: "18.5rem",
	height: "100%",
	borderRadius: "10px",
	border: "1px solid #D1D5DB",
	shadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
};

const minimalistMapStyle = [
	{
		elementType: "geometry",
		stylers: [{ color: "#f5f5f5" }],
	},
	{
		elementType: "labels.icon",
		stylers: [{ visibility: "off" }],
	},
	{
		elementType: "labels.text.fill",
		stylers: [{ color: "#616161" }],
	},
	{
		elementType: "labels.text.stroke",
		stylers: [{ color: "#f5f5f5" }],
	},
	{
		featureType: "administrative.land_parcel",
		elementType: "labels.text.fill",
		stylers: [{ color: "#bdbdbd" }],
	},
	{
		featureType: "poi",
		elementType: "geometry",
		stylers: [{ color: "#eeeeee" }],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [{ color: "#757575" }],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [{ color: "#e5e5e5" }],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [{ color: "#9e9e9e" }],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [{ color: "#ffffff" }],
	},
	{
		featureType: "road.arterial",
		elementType: "labels.text.fill",
		stylers: [{ color: "#757575" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [{ color: "#dadada" }],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [{ color: "#616161" }],
	},
	{
		featureType: "road.local",
		elementType: "labels.text.fill",
		stylers: [{ color: "#9e9e9e" }],
	},
	{
		featureType: "transit.line",
		elementType: "geometry",
		stylers: [{ color: "#e5e5e5" }],
	},
	{
		featureType: "transit.station",
		elementType: "geometry",
		stylers: [{ color: "#eeeeee" }],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [{ color: "#c9c9c9" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [{ color: "#9e9e9e" }],
	},
];
const mapOptions = {
	disableDefaultUI: true, // disables all default controls
	// Optionally, you can disable specific ones instead:
	zoomControl: false,
	streetViewControl: false,
	mapTypeControl: false,
	fullscreenControl: false,
	styles: minimalistMapStyle,
};

const createHotelIcon = () => {
	let svgMarkup = getHotelMarkerSvg();
	svgMarkup = svgMarkup.replace(/currentColor/g, "#0074d9"); // Replace with desired color
	const svgUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarkup)}`;
	return {
		url: svgUrl,
		scaledSize: new window.google.maps.Size(40, 50),
		anchor: new window.google.maps.Point(20, 50),
	};
};
export default function HotelMap({ hotels }: { hotels: Hotel[] }) {
	const [icon, setIcon] = useState<google.maps.Icon | null>(null);
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
	});
	useEffect(() => {
		if (isLoaded && window.google) {
			setIcon(createHotelIcon());
		}
	}, [isLoaded]);
	if (!isLoaded) return <div>Loading map...</div>;

	return (
		<div className="top-2 left-4 z-10 hidden md:sticky md:block md:h-[200px]">
			<GoogleMap
				center={{ lat: 39.5, lng: -8.0 }}
				zoom={6}
				mapContainerStyle={containerStyle}
				options={mapOptions}
			>
				{hotels.map(
					(hotel) =>
						hotel.lat &&
						hotel.lng && (
							<Marker
								key={hotel.uuid}
								position={{ lat: hotel.lat, lng: hotel.lng }}
								title={hotel.name ?? ""}
								{...(icon && { icon })}
							/>
						),
				)}
			</GoogleMap>
		</div>
	);
}
