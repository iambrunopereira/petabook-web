// components/HotelsPage.tsx
"use client";
import { type Hotel, hotelList } from "@marketing/db/hotels";
import { regionObj } from "@marketing/db/regions";
import Filters from "@marketing/home/components/hotelNew/Filters";
import HotelCard from "@marketing/home/components/hotelNew/HotelCard";
import HotelMap from "@marketing/home/components/hotelNew/HotelMap";
import HotelRow from "@marketing/home/components/hotelNew/HotelRow";
import ViewToggleDropdown from "@marketing/home/components/hotelNew/ViewToggleDropdown";
import {} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function HotelsPage() {
	const [view, setView] = useState<"grid" | "list">("grid");
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [currentCenter, setCurrentCenter] = useState([39.5, -8.0]);
	const [currentZoom, setCurrentZoom] = useState(6);
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isMobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [filters, setFilters] = useState({
		regions: [] as string[],
		onlyPartners: false,
		minPrice: 0,
		maxPrice: 30,
		attributes: [] as string[],
	});
	const [sortBy, setSortBy] = useState<"rating" | "price">("price");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
	useEffect(() => {
		if (!searchParams) return;

		const regions = searchParams.get("regions")?.split(",") ?? [];
		const onlyPartners = searchParams.get("partner") === "1";
		const minPrice = Number.parseInt(searchParams.get("minPrice") || "0");
		const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "30");
		const attributes = searchParams.get("attributes")?.split(",") ?? [];

		const mainCenter = regionObj[regions[0]];
		if (regions.length === 1) {
			setCurrentCenter(mainCenter.center);
			setCurrentZoom(9);
		} else if (regions.length > 1) {
			setCurrentCenter(mainCenter.center);
			setCurrentZoom(7);
		} else {
			setCurrentCenter([39.5, -8.0]);
			setCurrentZoom(5);
		}
		if (mainCenter) {
			setCurrentCenter(mainCenter.center);
		}

		setFilters({
			regions,
			onlyPartners,
			minPrice,
			maxPrice,
			attributes,
		});
	}, [searchParams]);

	// ⬆️ When filters change, update URL
	const updateUrlFilters = (newFilters: typeof filters) => {
		const params = new URLSearchParams();

		if (newFilters.regions.length > 0) {
			params.set("regions", newFilters.regions.join(","));
		}
		if (newFilters.onlyPartners) {
			params.set("partner", "1");
		}
		params.set("minPrice", newFilters.minPrice.toString());
		params.set("maxPrice", newFilters.maxPrice.toString());
		if (newFilters.attributes.length > 0) {
			params.set("attributes", newFilters.attributes.join(","));
		}
		router.replace(`/search?${params.toString()}`);
	};

	const handleFiltersChange = (newFilters: typeof filters) => {
		setFilters(newFilters);
		updateUrlFilters(newFilters);
	};
	const shuffleHotels = (hotels: Hotel[]): Hotel[] => {
		const shuffled = [...hotels];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};
	const filteredHotels = useMemo(() => {
		const result = hotelList.filter((hotel) => {
			const regionMatch = filters.regions.length
				? hotel.region?.some((r) => filters.regions.includes(r))
				: true;

			const partnerMatch = filters.onlyPartners ? hotel.petabookPartner : true;

			const priceMatch =
				typeof hotel.prices === "number" &&
				hotel.prices >= filters.minPrice &&
				hotel.prices <= filters.maxPrice;

			const attributesMatch = filters.attributes.length
				? hotel.attributes?.some((a) => filters.attributes.includes(a.uuid))
				: true;

			return regionMatch && partnerMatch && priceMatch && attributesMatch;
		});

		result.sort((a, b) => {
			const fieldA = sortBy === "price" ? a.prices : a.rating;
			const fieldB = sortBy === "price" ? b.prices : b.rating;

			if (fieldA === undefined || fieldB === undefined) return 0;

			return sortOrder === "asc"
				? (fieldA ?? 0) - (fieldB ?? 0)
				: (fieldB ?? 0) - (fieldA ?? 0);
		});

		return shuffleHotels(result);
	}, [filters, sortBy, sortOrder]);

	useEffect(() => {
		// Reset scroll position to the top when filters or hotels change
		window.scrollTo(0, 0);
	}, [filters, filteredHotels]);
	return (
		<div
			className={
				"container relative flex min-h-screen w-full flex-col gap-4 p-4 md:flex-row"
			}
		>
			{/* Map top left on all views */}
			<div className="top-2 left-4 z-10 block md:sticky md:h-[200px]">
				<HotelMap
					hotels={filteredHotels}
					center={currentCenter}
					zoom={currentZoom}
				/>

				{/* View Switcher */}
				<div className="my-4">
					<ViewToggleDropdown view={view} onChange={setView} />
				</div>

				<div className="relative mb-4 w-full md:mb-0">
					<select
						value={`${sortBy}-${sortOrder}`}
						onChange={(e) => {
							const [field, order] = e.target.value.split("-");
							setSortBy(field as "rating" | "price");
							setSortOrder(order as "asc" | "desc");
						}}
						className="flex w-full items-center justify-between rounded border border-gray-200 bg-white px-3 py-2 shadow-sm "
					>
						<option value="price-asc">Preço: menor para maior</option>
						<option value="price-desc">Preço: maior para menor</option>
						<option value="rating-asc">Avaliação: menor para maior</option>
						<option value="rating-desc">Avaliação: maior para menor</option>
					</select>
				</div>

				{/* Mobile filter toggle */}
				<div className="md:hidden">
					<button
						onClick={() => setMobileFiltersOpen(true)}
						className="w-full rounded bg-blue-600 px-4 py-2 text-white shadow"
					>
						Filtrar hotéis
					</button>
				</div>

				{/* Desktop filters */}
				<div className="mt-4 hidden md:block">
					<Filters filters={filters} onChange={handleFiltersChange} />
				</div>
			</div>

			{/* Mobile sidebar drawer */}
			{isMobileFiltersOpen && (
				<div className="fixed inset-0 z-50 bg-black bg-opacity-40">
					<div className="absolute top-0 right-0 h-full w-3/4 max-w-sm bg-white p-4 shadow-lg">
						<div className="mb-4 flex items-center justify-between">
							<h2 className="font-bold text-lg">Filtros</h2>
							<button
								onClick={() => setMobileFiltersOpen(false)}
								className="text-gray-600 text-xl"
							>
								✕
							</button>
						</div>
						<Filters
							filters={filters}
							onChange={(f) => {
								handleFiltersChange(f);
								setMobileFiltersOpen(false);
							}}
						/>
					</div>
				</div>
			)}
			{/* <div className={"sticky top-2 left-4 z-10 h-[200px] "}>
				<HotelMap hotels={filteredHotels} />
				<br />
				<ViewToggleDropdown view={view} onChange={setView} />
				<br />
				<Filters filters={filters} onChange={handleFiltersChange} />
			</div> */}

			<div className="w-full">
				{filteredHotels.length > 0 ? (
					<div
						className={
							view === "grid"
								? "grid grid-cols-1 gap-4 sm:grid-cols-2"
								: "space-y-4"
						}
					>
						{filteredHotels.map((hotel) =>
							view === "grid" ? (
								<HotelCard key={hotel.uuid} hotel={hotel} />
							) : (
								<HotelRow key={hotel.uuid} hotel={hotel} />
							),
						)}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center space-y-4">
						<div className="flex w-full gap-4 rounded-lg border bg-white p-4 shadow-sm transition">
							Ups... Não conseguimos encontrar nenhum estabelecimento com as
							opções que escolheste. Não desistas, de certeza que temos o que
							procuras!
						</div>
						<button
							type="button"
							onClick={() => {
								setFilters({
									regions: [],
									onlyPartners: false,
									minPrice: 0,
									maxPrice: 30,
									attributes: [],
								});
								setSortBy("price");
								setSortOrder("asc");
								updateUrlFilters({
									regions: [],
									onlyPartners: false,
									minPrice: 0,
									maxPrice: 30,
									attributes: [],
								});
							}}
							className="rounded bg-blue-600 px-4 py-2 text-white shadow"
						>
							Tentar novamente
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
