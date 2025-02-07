import { Briefcase, Coffee, MapPin, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface NearbyService {
	id: number;
	name: string;
	category: string;
	location: string;
	image: string;
}

export default function NearbyServices({
	services,
}: { services: NearbyService[] }) {
	return (
		<div className="mt-10 border-t pt-6">
			<h3 className="font-bold text-xl">Nearby Services</h3>
			<p className="mt-1 text-gray-600 text-sm">
				Find pet-friendly spots and essential services around this hotel.
			</p>

			<div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				{services.map((service) => (
					<div
						key={service.id}
						className="overflow-hidden rounded-lg border bg-white shadow-sm"
					>
						{/* Service Image */}
						<div className="relative h-32 w-full">
							<Image
								src={service.image}
								alt={service.name}
								fill
								className="rounded-t-lg"
							/>
						</div>

						{/* Service Details */}
						<div className="p-4">
							<div className="flex items-center gap-2 text-gray-600 text-sm">
								<MapPin size={16} />
								<span>{service.location}</span>
							</div>

							<h4 className="mt-2 font-semibold text-lg">{service.name}</h4>
							<div className="mt-1 flex items-center text-gray-500 text-sm">
								{service.category === "vet" && (
									<Briefcase size={16} className="mr-1" />
								)}
								{service.category === "cafe" && (
									<Coffee size={16} className="mr-1" />
								)}
								{service.category === "store" && (
									<ShoppingBag size={16} className="mr-1" />
								)}
								<span>
									{service.category.charAt(0).toUpperCase() +
										service.category.slice(1)}
								</span>
							</div>

							{/* Visit Button */}
							<button className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700">
								View Details
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
