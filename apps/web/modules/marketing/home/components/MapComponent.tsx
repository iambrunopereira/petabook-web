// components/MapComponent.js
import { getHotelMarkerSvg } from "@marketing/home/components/HotelMarkerSVG";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
	width: "100%",
	height: "150px",
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
	focusable: false,
	clickableIcons: false,
	draggable: false,
	keyboardShortcuts: false,
	scrollwheel: false,
	disableDoubleClickZoom: true,
	gestureHandling: "none",
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

const MapComponent = ({ hotelId, center, positions }) => {
	const mapCenter =
		Array.isArray(center) && center.length === 2
			? { lat: Number(center[0]), lng: Number(center[1]) }
			: { lat: 0, lng: 0 };

	const [icon, setIcon] = useState(null);

	const handleMapLoad = () => {
		if (window.google && !icon) {
			console.log("Google Maps API loaded, creating custom icon");
			setIcon(createHotelIcon());
		}
	};

	return (
		<LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={mapCenter}
				zoom={13}
				onLoad={handleMapLoad}
				options={mapOptions}
			>
				{icon &&
					positions?.map((pos, idx) => (
						<Marker
							key={idx}
							position={{ lat: Number(pos.lat), lng: Number(pos.lng) }}
							icon={icon}
						/>
					))}
			</GoogleMap>
		</LoadScript>
	);
};

export default MapComponent;
