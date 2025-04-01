// components/HotelRow.tsx
import type { Hotel } from "@marketing/db/hotels";
import { BadgeCheck, PawPrint } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
	hotel: Hotel;
};

export default function HotelRow({ hotel }: Props) {
	const router = useRouter();
	return (
		<div
			className="flex cursor-pointer gap-4 rounded-lg border bg-white p-4 shadow-sm transition hover:scale-105 hover:shadow-md"
			onClick={() => router.push(`/hotels/${hotel.uuid}`)}
		>
			<div className="relative h-32 w-40 shrink-0">
				{hotel.petabookPartner && (
					<div className="absolute top-2 right-2 z-10 flex items-center rounded-lg bg-yellow-500 px-2 py-1 font-bold text-white text-xs">
						<BadgeCheck size={14} className="mr-1" /> Hotel Parceiro
					</div>
				)}
				<Image
					src={hotel.images?.[0] || "/images/placeholder.jpg"}
					alt={hotel.name || "Hotel"}
					fill
					className="rounded object-cover"
				/>
			</div>

			<div className="flex-1">
				<div className="flex items-center justify-between">
					<h3 className="mb-1 font-semibold text-xl">{hotel.name}</h3>
					<div className="mt-1 flex items-center gap-1 text-yellow-500">
						{Array.from({ length: hotel.rating || 0 }).map((_, i) => (
							<PawPrint key={i} size={16} className="fill-yellow-500" />
						))}
					</div>
				</div>

				<p className="mb-2 text-gray-500 text-sm">{hotel.location}</p>
				<p className="line-clamp-3 text-gray-700 text-sm">
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
						Ver detalhes
					</Link> */}
				</div>
			</div>
		</div>
	);
}
