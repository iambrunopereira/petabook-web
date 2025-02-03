import Image from "next/image";
import { MapPin, Briefcase, Coffee, ShoppingBag } from "lucide-react";

interface NearbyService {
  id: number;
  name: string;
  category: string;
  location: string;
  image: string;
}

export default function NearbyServices({ services }: { services: NearbyService[] }) {
  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-xl font-bold">Nearby Services</h3>
      <p className="text-gray-600 text-sm mt-1">Find pet-friendly spots and essential services around this hotel.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5">
        {services.map((service) => (
          <div key={service.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
            {/* Service Image */}
            <div className="relative w-full h-32">
              <Image src={service.image} alt={service.name} fill className="rounded-t-lg" />
            </div>

            {/* Service Details */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin size={16} />
                <span>{service.location}</span>
              </div>

              <h4 className="text-lg font-semibold mt-2">{service.name}</h4>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                {service.category === "vet" && <Briefcase size={16} className="mr-1" />}
                {service.category === "cafe" && <Coffee size={16} className="mr-1" />}
                {service.category === "store" && <ShoppingBag size={16} className="mr-1" />}
                <span>{service.category.charAt(0).toUpperCase() + service.category.slice(1)}</span>
              </div>

              {/* Visit Button */}
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm w-full hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}