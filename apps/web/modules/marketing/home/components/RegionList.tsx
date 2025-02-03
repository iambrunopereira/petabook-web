import { Region, regionList } from '@marketing/db/regions';
import RegionCard from '@marketing/home/components/RegionCard';

export default function RegionList() {
  // Filter the main regions.
  const mainRegions: Region[] = regionList.filter(region => region.main);
  // Filter out the other regions.
  const otherRegions: Region[] = regionList.filter(region => !region.main);

  // Randomize the other regions and take the first 4.
  const randomOtherRegions: Region[] = [...otherRegions]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  return (
    <div className="container max-w-6xl mx-auto py-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Explore Favorite Regions
      </h2>

      {/* Main Regions (Top Row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {mainRegions.map((region) => (
          <div key={region.uuid} className="md:col-span-2">
            <RegionCard {...region} />
          </div>
        ))}
      </div>

      {/* Other Regions (Random 4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {randomOtherRegions.map((region) => (
          <RegionCard key={region.uuid} {...region} />
        ))}
      </div>
    </div>
  );
}