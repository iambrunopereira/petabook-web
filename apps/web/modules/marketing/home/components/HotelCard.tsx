"use client";
import type { Hotel } from "@marketing/db/hotels";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HotelCardProps {
	image: string;
	name: string;
	location: string;
	rating: number;
	price: number;
	isPartner: boolean;
}

export default function HotelCard({
	images,
	name,
	location,
	rating,
	prices,
	petabookPartner,
	uuid,
}: Hotel) {
	const router = useRouter();
	return (
		<div className="min-h-96 transform overflow-hidden rounded-lg bg-white shadow-sm transition hover:scale-105">
			{/* Hotel Image */}
			<div className="relative h-48 w-full">
				{petabookPartner && (
					<div className="absolute top-2 right-2 z-10 flex items-center rounded-lg bg-yellow-500 px-2 py-1 font-bold text-white text-xs">
						<BadgeCheck size={14} className="mr-1" /> Hotel Parceiro
					</div>
				)}
				{images && (
					<Image
						src={images[0]!}
						alt={name ?? ""}
						fill
						className="rounded-t-lg"
					/>
				)}
			</div>
			{/* Hotel Details */}
			<div className="flex h-full flex-col content-between justify-between p-4 ">
				<h3 className="h-14 font-semibold text-gray-800 text-lg">{name}</h3>
				<div className="mt-1 flex items-center text-gray-500 text-sm">
					<MapPin size={16} className="mr-1" />
					{location}
				</div>

				{/* Rating Stars */}
				<div className="mt-2 flex items-center">
					{Array.from({ length: 5 }, (_, index) => (
						<Star
							key={index}
							size={16}
							className={
								index < (rating ?? 0) ? "text-yellow-500" : "text-gray-300"
							}
						/>
					))}
				</div>

				{/* Price & Booking Button */}
				<div
					className={`mt-4 flex items-center ${prices != 0 ? "justify-between" : "justify-end"}`}
				>
					{prices != 0 && (
						<span className="font-semibold text-blue-600 text-lg">
							€{prices}/noite
						</span>
					)}
					<button
						onClick={() => router.push(`/hotels/${uuid}`)}
						className="rounded-lg bg-blue-600 px-4 py-2 text-right text-sm text-white transition hover:bg-blue-700"
					>
						Ver
					</button>
				</div>
			</div>
		</div>
	);
}
