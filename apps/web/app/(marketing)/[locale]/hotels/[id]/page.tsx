"use client";
import { BadgeCheck, Facebook, Globe, Instagram, PawPrint } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import "swiper/css";
import { type Hotel, hotelList } from "@marketing/db/hotels";
import HotelImageCard from "@marketing/home/components/HotelImageCard";

// ✅ Dynamically import `react-leaflet` components to prevent SSR issues
const MapContainer = dynamic(
	() => import("react-leaflet").then((mod) => mod.MapContainer),
	{ ssr: false },
);
const TileLayer = dynamic(
	() => import("react-leaflet").then((mod) => mod.TileLayer),
	{ ssr: false },
);
const Marker = dynamic(
	() => import("react-leaflet").then((mod) => mod.Marker),
	{ ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
	ssr: false,
});
const MapComponent = dynamic(
	() => import("@marketing/home/components/MapComponent"),
	{
		ssr: false,
	},
);
const L = typeof window !== "undefined" ? require("leaflet") : null;
const nearbyServices = [
	{
		id: 1,
		name: "Lisbon Vet Clinic",
		category: "vet",
		location: "Lisboa",
		image: "/images/assets/lisboa.jpg",
	},
	{
		id: 2,
		name: "Pet-Friendly Café",
		category: "cafe",
		location: "Lisboa",
		image: "/images/assets/porto.jpg",
	},
	{
		id: 3,
		name: "Pet Supplies Store",
		category: "store",
		location: "Lisboa",
		image: "/images/assets/algarve.jpg",
	},
];

export default function HotelDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const router = useRouter();
	const { id } = use(params);
	const [hotel, setHotel] = useState<Hotel | any>(null);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [newComment, setNewComment] = useState("");
	const [newRating, setNewRating] = useState(5);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		const hotelData = hotelList.find((h) => h.uuid === id);
		if (!hotelData) {
			router.push("/404");
		} else {
			setHotel(hotelData);
			setSelectedImage(hotelData.images ? hotelData.images[0] : null);
		}
		setIsClient(true);
	}, [id, router]);

	const handleAddComment = () => {
		if (newComment.trim() !== "") {
			setHotel((prevHotel: any) => ({
				...prevHotel,
				comments: [
					...prevHotel.comments,
					{ user: "Guest", rating: newRating, comment: newComment },
				],
			}));
			setNewComment("");
			setNewRating(5);
		}
	};

	if (!hotel)
		return <p className="mt-20 text-center text-gray-500">A carregar...</p>;
	const createHotelIcon = (hotelId: string) =>
		L.divIcon({
			className: "custom-marker",

			iconSize: [40, 50],
			iconAnchor: [20, 50],
			popupAnchor: [0, -50],
		});
	return (
		<div className="container mx-auto mt-20 p-4">
			<Link href="/" className="hover:underline">
				← Voltar
			</Link>

			{/* SECTION: HOTEL HEADER */}
			<div className="mt-5 flex flex-col border-b pb-6 md:flex-row">
				<div className="md:w-1/2">
					<div className="relative overflow-hidden rounded-lg shadow-lg ">
						{hotel.petabookPartner && (
							<div className="absolute top-2 right-2 flex items-center rounded-lg bg-yellow-500 px-2 py-1 font-bold text-white text-xs">
								<BadgeCheck size={14} className="mr-1" /> Hotel parceiro
							</div>
						)}

						<HotelImageCard
							images={hotel.images}
							title={hotel.name}
							uuid={hotel.uuid}
						/>
					</div>
				</div>

				<div className="p-5 md:w-1/2">
					<div className="mt-1 mb-2 flex items-center gap-1 text-yellow-500">
						{Array.from({ length: 5 }).map((_, i) => (
							<PawPrint
								key={i}
								size={16}
								className={hotel.rating >= i + 1 ? "fill-yellow-500" : ""}
							/>
						))}
					</div>
					<div className="flex gap-2">
						<h1 className="font-bold text-3xl">{hotel.name}</h1>
					</div>
					<p className="text-gray-600 text-lg">{hotel.location}</p>

					<p className="mt-3 text-gray-700">{hotel.shortDescription}</p>
					<div className="my-5">
						{hotel.prices !== 0 && (
							<div className="flex flex-col gap-2">
								<span className="mr-2 font-semibold text-green-600 text-xl">
									€{hotel.prices} / noite*
								</span>
								<span className="text-gray-500 text-xs">
									*Preços indicativos, podem variar consoante a época
								</span>
							</div>
						)}
					</div>

					<p className="text-sm opacity-70">Contacto: {hotel.contact}</p>
					<p className="text-sm opacity-70">Email: {hotel.email}</p>
					<button
						onClick={() =>
							window.open(
								hotel.petabookPartner
									? `https://docs.google.com/forms/d/e/1FAIpQLSeCuuQ0KpYH11GRNZF9yvGRsrj9rc8Px9x9FIycHjmBNiEUhA/viewform?entry.555514883=${hotel.name}`
									: hotel.website,
								"_blank",
							)
						}
						className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg"
					>
						Reserve
					</button>

					<div className="mt-5 flex gap-3">
						<Link href={hotel.instagram ?? ""}>
							<Instagram className="hover:!grayscale-0 size-5 text-primary grayscale" />
						</Link>
						<Link href={hotel.facebook ?? ""}>
							<Facebook className="hover:!grayscale-0 size-5 text-primary grayscale" />
						</Link>
						<Link href={hotel.website ?? ""}>
							<Globe className="hover:!grayscale-0 size-5 text-primary grayscale" />
						</Link>
					</div>
				</div>
			</div>
			{hotel.attributes && hotel.attributes.length > 0 && (
				<div className="mt-10 pb-6">
					<h3 className="font-bold text-xl">Comodidades</h3>
					<ul className="mt-3 flex flex-wrap gap-2 text-gray-700 text-sm">
						{hotel.attributes.map((attr: { uuid: string; name: string }) => {
							return (
								<li
									key={attr.uuid}
									className="inline-flex items-center rounded-md border px-3 py-1 shadow-sm"
								>
									{attr.name}
								</li>
							);
						})}
					</ul>
				</div>
			)}
			<div className="mt-10 border-b pb-6">
				<h3 className="font-bold text-xl">Descrição</h3>
				{isClient && (
					<div className="mt-4 w-full rounded-lg">
						<p className="mt-3 text-gray-700">{hotel.longDescription}</p>
					</div>
				)}
			</div>
			{/* SECTION: SMALLER MAP */}
			<div className="mt-10 border-b pb-6">
				<h3 className="font-bold text-xl">Localização</h3>
				<div className="relative mt-4 h-40 w-full overflow-hidden rounded-lg">
					<MapComponent
						center={[hotel.lat, hotel.lng]}
						positions={[{ lat: hotel.lat, lng: hotel.lng }]}
					/>
				</div>
			</div>
			{/* SECTION: SERVICES */}
			{/* 	<div className="mt-10 pb-6">
				<h3 className="font-bold text-xl">Serviços disponiveis</h3>
				<ul className="mt-3 list-inside list-disc text-gray-600">
					{hotel.services.map((service: string, index: number) => (
						<li key={index}>{service}</li>
					))}
				</ul>
			</div> */}
			{/* SECTION: COMMENTS WITH AVATARS */}
			{/* <div className="mt-10">
				<Reviews hotel={[]} />
			</div> */}

			{/* <NearbyServices services={nearbyServices} /> */}
		</div>
	);
}
