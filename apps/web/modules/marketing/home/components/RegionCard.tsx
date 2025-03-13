"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface RegionCardProps {
	image: string;
	region: string;
}

export default function RegionCard({ image, region }: RegionCardProps) {
	const router = useRouter();

	const handleClick = () => {
		router.push(
			`/search?location=${encodeURIComponent(region.toLocaleLowerCase())}`,
		);
	};

	return (
		<div
			onClick={handleClick}
			className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-transform duration-200 hover:scale-105"
		>
			{/* Background Image */}
			<div className="relative h-52 w-full">
				<Image
					src={image}
					alt={region}
					fill
					className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
				/>
			</div>

			{/* Overlay */}
			<div className="absolute inset-0 bg-black/40 transition duration-300 group-hover:bg-black/50"></div>

			{/* Region Name */}
			<h3 className="absolute bottom-4 left-4 font-semibold text-white text-xl transition group-hover:text-yellow-300">
				{region}
			</h3>
		</div>
	);
}
