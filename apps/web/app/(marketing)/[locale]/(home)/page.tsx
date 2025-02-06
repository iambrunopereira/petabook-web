import { hotelList } from "@marketing/db/hotels";
import {
	getHotelsForAlgarve,
	getHotelsForLisbon,
	getHotelsForNorte,
} from "@marketing/db/hotelsFilter";
import HeroSection from "@marketing/home/components/HeroSection";
import HotelList from "@marketing/home/components/HotelList";
import { Newsletter } from "@marketing/home/components/Newsletter";
import { Partners } from "@marketing/home/components/Partners";
import RegionList from "@marketing/home/components/RegionList";
import Testimonials from "@marketing/home/components/Testimonials";
import { setRequestLocale } from "next-intl/server";

const hotelsPartners = [
	{
		id: "1",
		image: "/images/assets/hotel1.jpg",
		name: "Cozy Pet Stay",
		location: "Lisbon, Portugal",
		rating: 4,
		price: 89,
		isPartner: true,
	},
	{
		id: "2",
		image: "/images/assets/hotel2.jpg",
		name: "Luxury Pet Resort",
		location: "Porto, Portugal",
		rating: 5,
		price: 129,
		isPartner: true,
	},
	{
		id: "3",
		image: "/images/assets/hotel3.jpg",
		name: "Beachside Pet Paradise",
		location: "Algarve, Portugal",
		rating: 4,
		price: 99,
		isPartner: true,
	},
	{
		id: "4",
		image: "/images/assets/hotel4.jpeg",
		name: "Urban Pet Retreat",
		location: "Braga, Portugal",
		rating: 3,
		price: 75,
		isPartner: true,
	},
	{
		id: "5",
		image: "/images/assets/hotel5.jpeg",
		name: "Mountain Pet Escape",
		location: "Madeira, Portugal",
		rating: 4,
		price: 110,
		isPartner: true,
	},
];

const hotelsLisbon = [
	{
		id: "1",
		image: "/images/assets/hotel1.jpg",
		name: "Cozy Pet Stay",
		location: "Lisbon, Portugal",
		rating: 4,
		price: 89,
		isPartner: true,
	},
	{
		id: "2",
		image: "/images/assets/hotel2.jpg",
		name: "Luxury Pet Resort",
		location: "Lisbon, Portugal",
		rating: 5,
		price: 129,
		isPartner: false,
	},
	{
		id: "3",
		image: "/images/assets/hotel3.jpg",
		name: "Beachside Pet Paradise",
		location: "Lisbon, Portugal",
		rating: 4,
		price: 99,
		isPartner: true,
	},
	{
		id: "4",
		image: "/images/assets/hotel4.jpeg",
		name: "Urban Pet Retreat",
		location: "Lisbon, Portugal",
		rating: 3,
		price: 75,
		isPartner: false,
	},
	{
		id: "5",
		image: "/images/assets/hotel5.jpeg",
		name: "Mountain Pet Escape",
		location: "Lisbon, Portugal",
		rating: 4,
		price: 110,
		isPartner: false,
	},
];

const hotelsNorth = [
	{
		id: "1",
		image: "/images/assets/hotel1.jpg",
		name: "Cozy Pet Stay",
		location: "Guarda, Portugal",
		rating: 4,
		price: 89,
		isPartner: true,
	},
	{
		id: "2",
		image: "/images/assets/hotel2.jpg",
		name: "Luxury Pet Resort",
		location: "Porto, Portugal",
		rating: 5,
		price: 129,
		isPartner: false,
	},
	{
		id: "3",
		image: "/images/assets/hotel3.jpg",
		name: "Beachside Pet Paradise",
		location: "Serra da estrela, Portugal",
		rating: 4,
		price: 99,
		isPartner: true,
	},
	{
		id: "4",
		image: "/images/assets/hotel4.jpeg",
		name: "Urban Pet Retreat",
		location: "Braga, Portugal",
		rating: 3,
		price: 75,
		isPartner: false,
	},
	{
		id: "5",
		image: "/images/assets/hotel5.jpeg",
		name: "Mountain Pet Escape",
		location: "Braga, Portugal",
		rating: 4,
		price: 110,
		isPartner: false,
	},
];

const hotelsAlgarve = [
	{
		id: "1",
		image: "/images/assets/hotel1.jpg",
		name: "Cozy Pet Stay",
		location: "Algarve, Portugal",
		rating: 4,
		price: 89,
		isPartner: true,
	},
	{
		id: "2",
		image: "/images/assets/hotel2.jpg",
		name: "Luxury Pet Resort",
		location: "Algarve, Portugal",
		rating: 5,
		price: 129,
		isPartner: false,
	},
	{
		id: "3",
		image: "/images/assets/hotel3.jpg",
		name: "Beachside Pet Paradise",
		location: "Algarve, Portugal",
		rating: 4,
		price: 99,
		isPartner: true,
	},
	{
		id: "4",
		image: "/images/assets/hotel4.jpeg",
		name: "Urban Pet Retreat",
		location: "Algarve, Portugal",
		rating: 3,
		price: 75,
		isPartner: false,
	},
	{
		id: "5",
		image: "/images/assets/hotel5.jpeg",
		name: "Mountain Pet Escape",
		location: "Algarve, Portugal",
		rating: 4,
		price: 110,
		isPartner: false,
	},
];

const lisbonHotels = getHotelsForLisbon();
const algarveHotels = getHotelsForAlgarve();
const norteHotels = getHotelsForNorte();

const hotelsPartner = hotelList.filter(
	(hotel) => hotel.petabookPartner === true,
);

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<HeroSection />
			<HotelList title="Os nossos Hoteis parceiros" hotels={hotelsPartner} />
			<RegionList />
			<HotelList
				title="Encontra os melhores hoteis para pets em Lisboa"
				hotels={lisbonHotels}
			/>
			<HotelList
				title="Não percas a oportunidade de conhecer os hoteis a Norte de Portugal"
				hotels={norteHotels}
			/>
			<HotelList
				title="Vem viajar para o Algarve e deixa o teu Pet no melhor hotel!"
				hotels={algarveHotels}
			/>
			<Testimonials />
			<Newsletter />
			<Partners />
		</>
	);
}
