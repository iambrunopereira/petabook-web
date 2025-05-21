import {
	getHotelsForAlgarve,
	getHotelsForLisbon,
	getHotelsForNorte,
	getHotelsPartners,
} from "@marketing/db/hotelsFilter";
import HeroSection from "@marketing/home/components/HeroSection";
import HotelList from "@marketing/home/components/HotelList";
import { Newsletter } from "@marketing/home/components/Newsletter";
import { Partners } from "@marketing/home/components/Partners";
import RegionList from "@marketing/home/components/RegionList";
import Testimonials from "@marketing/home/components/Testimonials";
import { setRequestLocale } from "next-intl/server";

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
			<HotelList
				title="Os nossos Hoteis parceiros"
				hotels={getHotelsPartners()}
			/>
			<RegionList />
			<HotelList
				title="Encontra os melhores hoteis para pets em Lisboa"
				hotels={getHotelsForLisbon()}
			/>
			<HotelList
				title="Não percas a oportunidade de conhecer os hoteis a Norte de Portugal"
				hotels={getHotelsForNorte()}
			/>
			<HotelList
				title="Vem viajar para o Algarve e deixa o teu Pet no melhor hotel!"
				hotels={getHotelsForAlgarve()}
			/>
			<Testimonials />
			<Newsletter />
			<Partners />
		</>
	);
}
