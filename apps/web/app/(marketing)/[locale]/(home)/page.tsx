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
