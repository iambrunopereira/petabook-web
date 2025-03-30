// components/HotelCard.tsx
import type { Hotel } from "@marketing/db/hotels";
import { BadgeCheck, PawPrint } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
	hotel: Hotel;
};

export default function HotelCard({ hotel }: Props) {
	const router = useRouter();
	return (
		<div
			className="cursor-pointer overflow-hidden rounded-lg border bg-white shadow transition hover:scale-105 hover:shadow-md"
			onClick={() => router.push(`/hotels/${hotel.uuid}`)}
		>
			<div className="relative h-48 w-full">
				{hotel.petabookPartner && (
					<div className="absolute top-2 right-2 z-10 flex items-center rounded-lg bg-yellow-500 px-2 py-1 font-bold text-white text-xs">
						<BadgeCheck size={14} className="mr-1" /> Hotel Parceiro
					</div>
				)}
				<Image
					src={hotel.images?.[0] || "/images/placeholder.jpg"}
					alt={hotel.name || "Hotel"}
					fill
					className="object-cover"
				/>
			</div>

			<div className="p-4">
				<div className="flex items-center justify-between">
					<h3 className="mb-1 font-semibold text-xl">{hotel.name}</h3>
					<div className="mt-1 flex items-center gap-1 text-yellow-500">
						{Array.from({ length: hotel.rating || 0 }).map((_, i) => (
							<PawPrint key={i} size={16} className="fill-yellow-500" />
						))}
					</div>
				</div>
				<p className="text-gray-600 text-sm">{hotel.location}</p>
				<p className="truncate text-gray-700 text-sm">
					{hotel.shortDescription}
				</p>

				<div className="mt-2 flex items-center justify-between">
					{hotel.prices !== null && hotel.prices > 0 && (
						<span className="font-medium text-green-700 text-sm">
							Desde {hotel.prices}€
						</span>
					)}

					{/* <Link
						href={`/hotels/${hotel.uuid}`}
						className="text-blue-600 text-sm hover:underline"
					>
						Ver mais
					</Link> */}
				</div>
			</div>
		</div>
	);
}
