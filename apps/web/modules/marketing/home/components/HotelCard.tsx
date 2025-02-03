import Image from "next/image";
import { BadgeCheck, MapPin, Star } from "lucide-react";

interface HotelCardProps {
  image: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  isPartner: boolean;
}

export default function HotelCard({ image, name, location, rating, price, isPartner }: HotelCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transition transform hover:scale-105">
      {/* Hotel Image */}
      <div className="relative w-full h-48">
         {isPartner && (
              <div className="absolute z-10 top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center">
                <BadgeCheck size={14} className="mr-1" /> Hotel Parceiro
              </div>
            )}
        <Image src={image} alt={name} fill className="rounded-t-lg" />
      </div>

      {/* Hotel Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin size={16} className="mr-1" />
          {location}
        </div>

        {/* Rating Stars */}
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={16} className={index < rating ? "text-yellow-500" : "text-gray-300"} />
          ))}
        </div>

        {/* Price & Booking Button */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-blue-600">€{price}/noite</span>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition">
            Ver
          </button>
        </div>
      </div>
    </div>
  );
}