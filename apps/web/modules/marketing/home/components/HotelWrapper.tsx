'use client';
import HotelCard from '@marketing/home/components/HotelCard';
import HotelsMap from '@marketing/home/components/HotelsMap';
import { useEffect, useState } from 'react';

const hotels = [
  {
    id: 1,
    name: 'Cozy Pet Stay',
    location: 'Lisbon',
    lat: 38.7169,
    lng: -9.1399,
    price: 89,
    rating: 4,
    image: '/images/assets/hotel1.jpg',
    isPartner: false,
  },
  {
    id: 2,
    name: 'Luxury Pet Resort',
    location: 'Porto',
    lat: 41.1496,
    lng: -8.611,
    price: 129,
    rating: 5,
    image: '/images/assets/hotel2.jpg',
    isPartner: true,
  },
  {
    id: 3,
    name: 'Beachside Pet Paradise',
    location: 'Algarve',
    lat: 37.0176,
    lng: -7.9304,
    price: 99,
    rating: 4,
    image: '/images/assets/hotel3.jpg',
    isPartner: false,
  },
  {
    id: 4,
    name: 'Urban Pet Retreat',
    location: 'Braga',
    lat: 41.5454,
    lng: -8.4265,
    price: 75,
    rating: 3,
    image: '/images/assets/hotel4.jpeg',
    isPartner: false,
  },
];

export default function HotelsMapPage() {
  const [visibleHotels, setVisibleHotels] = useState(hotels); // ✅ Track visible hotels
  const [showList, setShowList] = useState(false); // ✅ Toggle hotel list on mobile
  console.log('visible', visibleHotels);
  useEffect(() => {
    console.log(visibleHotels);
  }, [visibleHotels]);
  return (
    <div className="container flex flex-col md:flex-row h-[90vh] mt-20 mb-5">
      {/* Mobile: Show toggle button */}
      <button
        className="md:hidden p-3 bg-blue-600 text-white rounded-lg m-2"
        onClick={() => setShowList(!showList)}
      >
        {showList ? 'Show Map' : 'Show Hotels'}
      </button>

      {/* Left: Hotel List (Sidebar) */}
      <div
        className={`absolute md:relative w-full md:w-1/3 p-4 overflow-y-auto border-r border-gray-200 custom-scrollbar z-10 transition-transform ${
          showList ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <h2 className="text-lg font-semibold mb-4">
          Available Hotels
        </h2>
        <div className="space-y-4">
          {visibleHotels.length === 0 ? (
            <p className="text-gray-500">No hotels in this area.</p>
          ) : (
            visibleHotels.map((hotel) => (
              <HotelCard key={hotel.id} {...hotel} />
            ))
          )}
        </div>
      </div>

      {/* Right: Map Section */}
      <div className="w-full md:w-2/3 h-full pl-3">
        <HotelsMap
          hotels={hotels}
          setVisibleHotels={setVisibleHotels}
        />
      </div>
    </div>
  );
}
