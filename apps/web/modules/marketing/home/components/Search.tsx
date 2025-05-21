"use client";

import { attributeList } from "@marketing/db/attributes";
import { regionList } from "@marketing/db/regions";
import { PriceRangeSlider } from "@marketing/home/components/hotelNew/PriceRangeSlider";
import {
	ChevronDown,
	ChevronUp,
	MapPin,
	Search,
	Settings2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
	const [isRegionDropdownOpen, setRegionDropdownOpen] = useState(false);
	const [isAttributeDropdownOpen, setAttributeDropdownOpen] = useState(false);

	const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
	const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 30]);
	const [onlyPartners, setOnlyPartners] = useState(false);

	const regionDropdownRef = useRef<HTMLDivElement>(null);
	const attributeDropdownRef = useRef<HTMLDivElement>(null);

	const router = useRouter();

	// Toggle logic
	const toggleRegion = (uuid: string) => {
		setSelectedRegions((prev) =>
			prev.includes(uuid) ? prev.filter((r) => r !== uuid) : [...prev, uuid],
		);
	};

	const toggleAttribute = (uuid: string) => {
		setSelectedAttributes((prev) =>
			prev.includes(uuid) ? prev.filter((a) => a !== uuid) : [...prev, uuid],
		);
	};

	// Build search URL
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();

		const params = new URLSearchParams();

		if (selectedRegions.length > 0) {
			params.set("regions", selectedRegions.join(","));
		}
		if (selectedAttributes.length > 0) {
			params.set("attributes", selectedAttributes.join(","));
		}
		if (onlyPartners) {
			params.set("partner", "1");
		}
		params.set("minPrice", priceRange[0].toString());
		params.set("maxPrice", priceRange[1].toString());

		router.push(`/search?${params.toString()}`);
	};

	// Close dropdowns on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				regionDropdownRef.current &&
				!regionDropdownRef.current.contains(event.target as Node)
			) {
				setRegionDropdownOpen(false);
			}
			if (
				attributeDropdownRef.current &&
				!attributeDropdownRef.current.contains(event.target as Node)
			) {
				setAttributeDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Selected Labels
	const selectedRegionLabels =
		regionList
			.filter((r) => selectedRegions.includes(r.uuid))
			.map((r) => r.region)
			.join(", ") || "Selecionar regiões";

	const selectedAttributeLabels =
		attributeList
			.filter((a) => selectedAttributes.includes(a.uuid))
			.map((a) => a.name)
			.join(", ") || "Selecionar características";

	return (
		<div className="relative">
			<form
				onSubmit={handleSearch}
				className="-translate-x-1/2 absolute top-1/2 left-1/2 flex w-full max-w-2xl translate-y-1/2 transform flex-col gap-4 rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-lg"
			>
				{/* Region Multi-Select */}
				<div className="relative" ref={regionDropdownRef}>
					<label className="mb-1 flex items-center gap-2 text-gray-600">
						<MapPin size={20} />
						Regiões
					</label>

					<button
						type="button"
						onClick={() => setRegionDropdownOpen((prev) => !prev)}
						className="flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-left text-gray-700 shadow-sm focus:outline-none"
					>
						<span
							className={selectedRegions.length === 0 ? "text-gray-400" : ""}
						>
							{selectedRegionLabels}
						</span>
						{isRegionDropdownOpen ? (
							<ChevronUp size={18} className="text-gray-500" />
						) : (
							<ChevronDown size={18} className="text-gray-500" />
						)}
					</button>

					{isRegionDropdownOpen && (
						<div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded border bg-white shadow-md">
							{regionList.map((region) => (
								<label
									key={region.uuid}
									className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50"
								>
									<input
										type="checkbox"
										checked={selectedRegions.includes(region.uuid)}
										onChange={() => toggleRegion(region.uuid)}
										className="accent-blue-600"
									/>
									{region.region}
								</label>
							))}
						</div>
					)}
				</div>

				{/* Attribute Multi-Select */}
				<div className="relative" ref={attributeDropdownRef}>
					<label className="mb-1 flex items-center gap-2 text-gray-600">
						<Settings2 size={20} />
						Características
					</label>

					<button
						type="button"
						onClick={() => setAttributeDropdownOpen((prev) => !prev)}
						className="flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-left text-gray-700 shadow-sm focus:outline-none"
					>
						<span
							className={selectedAttributes.length === 0 ? "text-gray-400" : ""}
						>
							{selectedAttributeLabels}
						</span>
						{isAttributeDropdownOpen ? (
							<ChevronUp size={18} className="text-gray-500" />
						) : (
							<ChevronDown size={18} className="text-gray-500" />
						)}
					</button>

					{isAttributeDropdownOpen && (
						<div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded border bg-white shadow-md">
							{attributeList.map((attr) => (
								<label
									key={attr.uuid}
									className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-50"
								>
									<input
										type="checkbox"
										checked={selectedAttributes.includes(attr.uuid)}
										onChange={() => toggleAttribute(attr.uuid)}
										className="accent-blue-600"
									/>
									{attr.name}
								</label>
							))}
						</div>
					)}
				</div>

				{/* Price Range */}
				<div>
					<PriceRangeSlider value={priceRange} onChange={setPriceRange} />
				</div>

				{/* Only Partners Toggle */}
				<div className="flex items-center justify-between">
					<label
						htmlFor="onlyPartnersToggle"
						className="font-medium text-gray-600"
					>
						Apenas parceiros Petabook
					</label>
					<button
						type="button"
						onClick={() => setOnlyPartners(!onlyPartners)}
						className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
							onlyPartners ? "bg-blue-600" : "bg-gray-300"
						}`}
						aria-pressed={onlyPartners}
					>
						<span
							className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
								onlyPartners ? "translate-x-6" : "translate-x-1"
							}`}
						/>
					</button>
				</div>

				{/* Search Button */}
				<button
					type="submit"
					className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
				>
					<Search size={20} />
					Procurar
				</button>
			</form>
		</div>
	);
}
