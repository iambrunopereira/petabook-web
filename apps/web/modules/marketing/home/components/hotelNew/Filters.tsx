"use client"; // Adjust path if needed
import { regionList } from "@marketing/db/regions";
import { PriceRangeSlider } from "@marketing/home/components/hotelNew/PriceRangeSlider";
import { useEffect, useRef, useState } from "react";

type Props = {
	filters: {
		regions: string[];
		onlyPartners: boolean;
		minPrice: number;
		maxPrice: number;
	};
	onChange: (filters: Props["filters"]) => void;
};

export default function Filters({ filters, onChange }: Props) {
	const [regions, setRegions] = useState(filters.regions);
	const [onlyPartners, setOnlyPartners] = useState(filters.onlyPartners);
	const [minPrice, setMinPrice] = useState(filters.minPrice);
	const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 30]);
	const [showRegionDropdown, setShowRegionDropdown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setRegions(filters.regions);
		setOnlyPartners(filters.onlyPartners);
		setMinPrice(filters.minPrice);
		setMaxPrice(filters.maxPrice);
		setPriceRange([filters.minPrice, filters.maxPrice]);
	}, [filters]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setShowRegionDropdown(false);
			}
		}

		if (showRegionDropdown) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showRegionDropdown]);

	const toggleRegion = (uuid: string) => {
		const updated = regions.includes(uuid)
			? regions.filter((r) => r !== uuid)
			: [...regions, uuid];
		setRegions(updated);
	};

	const updateFilters = () => {
		onChange({
			regions,
			onlyPartners,
			minPrice: priceRange[0],
			maxPrice: priceRange[1],
		});
	};

	return (
		<div className="mb-6 w-full p-4 md:max-w-[300px] md:rounded md:border md:bg-white md:shadow">
			<h2 className="mb-2 hidden font-bold text-lg md:block">Filtros</h2>

			{/* Region Multi-Select Dropdown */}
			<div className="mb-4">
				<label className="mb-1 block font-medium">Regiões</label>
				<div className="relative" ref={dropdownRef}>
					<button
						type="button"
						onClick={() => setShowRegionDropdown((v) => !v)}
						className="w-full rounded border px-3 py-2 text-left hover:border-gray-400"
					>
						{regions.length > 0
							? regionList
									.filter((r) => regions.includes(r.uuid))
									.map((r) => r.region)
									.join(", ")
							: "Selecionar regiões"}
					</button>

					{showRegionDropdown && (
						<div className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded border bg-white shadow">
							{regionList.map((region) => (
								<label
									key={region.uuid}
									className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
								>
									<input
										type="checkbox"
										checked={regions.includes(region.uuid)}
										onChange={() => toggleRegion(region.uuid)}
									/>
									{region.region}
								</label>
							))}
						</div>
					)}
				</div>
			</div>

			{/* Petabook Partner Toggle */}
			<div className="mb-4">
				<div className="flex items-center justify-between">
					<label className="font-medium">Apenas parceiros Petabook</label>
					<button
						onClick={() => setOnlyPartners(!onlyPartners)}
						className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
							onlyPartners ? "bg-blue-600" : "bg-gray-300"
						}`}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								onlyPartners ? "translate-x-6" : "translate-x-1"
							}`}
						/>
					</button>
				</div>
			</div>

			{/* Price Range Inputs */}
			<div className="mb-4">
				<div className="flex items-center gap-2">
					{/* <input
						type="number"
						min={0}
						max={maxPrice}
						value={minPrice}
						onChange={(e) => setMinPrice(Number(e.target.value))}
						className="w-full rounded border px-2 py-1"
						placeholder="Min"
					/>
					<span>até</span>
					<input
						type="number"
						min={minPrice}
						max={100}
						value={maxPrice}
						onChange={(e) => setMaxPrice(Number(e.target.value))}
						className="w-full rounded border px-2 py-1"
						placeholder="Max"
					/> */}
					<PriceRangeSlider value={priceRange} onChange={setPriceRange} />
				</div>
			</div>

			<button
				onClick={updateFilters}
				className="mt-2 w-full rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
			>
				Aplicar Filtros
			</button>
		</div>
	);
}
