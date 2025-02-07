import { type Region, regionList } from "@marketing/db/regions";
import RegionCard from "@marketing/home/components/RegionCard";

export default function RegionList() {
	// Filter the main regions.
	const mainRegions: Region[] = regionList.filter((region) => region.main);
	// Filter out the other regions.
	const otherRegions: Region[] = regionList.filter((region) => !region.main);

	// Randomize the other regions and take the first 4.
	const randomOtherRegions: Region[] = [...otherRegions]
		.sort(() => Math.random() - 0.5)
		.slice(0, 4);

	return (
		<div className="container mx-auto max-w-6xl py-12">
			<h2 className="mb-6 font-semibold text-2xl text-gray-800">
				Explora as regions favoritas
			</h2>

			{/* Main Regions (Top Row) */}
			<div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
				{mainRegions.map((region) => (
					<div key={`region3_${region.uuid}`} className="md:col-span-2">
						<RegionCard {...region} />
					</div>
				))}
			</div>

			{/* Other Regions (Random 4) */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{randomOtherRegions.map((region) => (
					<RegionCard key={`region_${region.uuid}`} {...region} />
				))}
			</div>
		</div>
	);
}
