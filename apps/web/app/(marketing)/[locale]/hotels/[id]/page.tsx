"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Star, BadgeCheck } from "lucide-react";
import "swiper/css";
import Reviews from "@marketing/home/components/ReviewSection";
import NearbyServices from "@marketing/home/components/NearbyServices";

// ✅ Dynamically import `react-leaflet` components to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const nearbyServices = [
  { id: 1, name: "Lisbon Vet Clinic", category: "vet", location: "Lisbon", image: "/images/assets/lisboa.jpg" },
  { id: 2, name: "Pet-Friendly Café", category: "cafe", location: "Lisbon", image: "/images/assets/porto.jpg" },
  { id: 3, name: "Pet Supplies Store", category: "store", location: "Lisbon", image: "/images/assets/algarve.jpg" },
];
const hotels = [
  {
    id: 1,
    name: "Cozy Pet Stay",
    location: "Lisbon",
    lat: 38.7169,
    lng: -9.1399,
    price: 89,
    rating: 4,
    isPartner: true,
    images: [
      "/images/assets/hotel1.jpg",
      "/images/assets/hotel2.jpg",
      "/images/assets/hotel3.jpg",
    ],
    description: "A warm and cozy place for your pets to stay.",
    longDescription: "A warm and cozy place for your pets to stay.",
    amenities: ["Free Wi-Fi", "Pet Grooming", "Outdoor Area"],
    services: ["Pet Sitting", "Vet Services", "Grooming", "Play Area"],
    comments: [
      { user: "Maria Doe", rating: 5, comment: "Amazing place! My dog loved it." },
      { user: "Alice Smith", rating: 4, comment: "Great service, but a bit expensive." },
    ],
  },
];

export default function HotelDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [hotel, setHotel] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const hotelData = hotels.find((h) => h.id === Number(id));
    if (!hotelData) {
      router.push("/404");
    } else {
      setHotel(hotelData);
      setSelectedImage(hotelData.images[0]);
    }
    setIsClient(true);
  }, [id, router]);

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setHotel((prevHotel: any) => ({
        ...prevHotel,
        comments: [...prevHotel.comments, { user: "Guest", rating: newRating, comment: newComment }],
      }));
      setNewComment("");
      setNewRating(5);
    }
  };

  if (!hotel) return <p className="text-center text-gray-500 mt-20">A carregar...</p>;

  return (
    <div className="container mx-auto mt-20 p-4">
      <Link href="/" className="hover:underline">← Voltar</Link>

      {/* SECTION: HOTEL HEADER */}
      <div className="flex flex-col md:flex-row mt-5 border-b pb-6">
        <div className="md:w-1/2">
          <div className="rounded-lg shadow-lg overflow-hidden relative">
            {hotel.isPartner && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center">
                <BadgeCheck size={14} className="mr-1" /> Hotel parceiro
              </div>
            )}
            <Image src={selectedImage!} alt={hotel.name} width={600} height={400} className="rounded-lg w-full" />
          </div>
          <div className="flex mt-3 space-x-2">
            {hotel.images.map((src: string, index: number) => (
              <button key={index} onClick={() => setSelectedImage(src)} className={`border rounded-lg overflow-hidden transition ${selectedImage === src ? "border-blue-500" : "border-gray-300"}`}>
                <Image src={src} alt={`Preview ${index + 1}`} width={100} height={70} className="w-24 h-16 object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 p-5">
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <p className="text-gray-600 text-lg">{hotel.location}</p>
          <p className="mt-3 text-gray-700">{hotel.description}</p>
          <div className="mt-5">
            <span className="text-xl font-semibold text-green-600">€{hotel.price} / noite</span>
            <span className="ml-4 text-yellow-500">⭐ {hotel.rating} / 5</span>
          </div>
          <button className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg">Reserve</button>
        </div>
      </div>

      {/* SECTION: SMALLER MAP */}
      <div className="mt-10 border-b pb-6">
        <h3 className="text-xl font-bold">Localização</h3>
        {isClient && (
          <div className="relative w-full h-40 mt-4 rounded-lg overflow-hidden">
            <MapContainer center={[hotel.lat, hotel.lng]} zoom={13} className="w-full h-full rounded-lg">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[hotel.lat, hotel.lng]}>
                <Popup>{hotel.name}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
         {/* SECTION: SERVICES */}
      <div className="mt-10 pb-6">
        <h3 className="text-xl font-bold">Serviços disponiveis</h3>
        <ul className="list-disc list-inside text-gray-600 mt-3">
          {hotel.services.map((service: string, index: number) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
      {/* SECTION: COMMENTS WITH AVATARS */}
      <div className="mt-10">
        <Reviews hotel={hotel} />
      </div>

      <NearbyServices services={nearbyServices} />
    </div>
  );
}