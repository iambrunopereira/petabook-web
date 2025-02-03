"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface RegionCardProps {
  image: string;
  region: string;
}

export default function RegionCard({ image, region }: RegionCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/search?region=${encodeURIComponent(region.toLocaleLowerCase())}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative overflow-hidden rounded-xl shadow-lg group cursor-pointer transition-transform duration-200 hover:scale-105"
    >
      {/* Background Image */}
      <div className="relative w-full h-52">
        <Image src={image} alt={region} fill className="transition-transform duration-300 group-hover:scale-105" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300"></div>

      {/* Region Name */}
      <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold group-hover:text-yellow-300 transition">
        {region}
      </h3>
    </div>
  );
}