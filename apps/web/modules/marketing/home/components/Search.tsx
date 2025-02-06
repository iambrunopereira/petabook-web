"use client";

import { type Region, regionList } from "@marketing/db/regions";
import { MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const cityRegionMapping: Record<string, string> = {
	Lisboa: "Centro",
	Porto: "Norte",
};

export default function SearchBar() {
	const [search, setSearch] = useState("");
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [suggestions, setSuggestions] = useState<Region[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (!search.trim()) {
			setSuggestions([]);
			return;
		}
		const filtered = regionList.filter((r) =>
			r.region.toLowerCase().includes(search.toLowerCase()),
		);
		setSuggestions(filtered);
	}, [search]);

	const handleSelectSuggestion = (region: Region) => {
		setSuggestions([]);
		const suggestionText = region.region; /*
    if (region.type === "city" && cityRegionMapping[region.region]) {
      suggestionText = `${region.region}, region ${cityRegionMapping[region.region]}`;
    } */
		setSearch(suggestionText);
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (!search.trim() /* || !checkIn || !checkOut */) return;
		router.push(`/search?location=${encodeURIComponent(search.toLowerCase())}`);
	};

	return (
		<div className="relative">
			<form
				onSubmit={handleSearch}
				className="-translate-x-1/2 absolute top-1/2 left-1/2 flex w-full max-w-2xl translate-y-1/2 transform flex-col gap-4 rounded-xl bg-white/80 p-4 shadow-lg backdrop-blur-lg"
			>
				<div className="flex items-center gap-2">
					<MapPin className="text-gray-500" size={20} />
					<div className="relative w-full">
						<input
							type="text"
							placeholder="Procura o hotel para o teu pet..."
							className="w-full rounded-lg bg-transparent px-4 py-3 text-gray-700 placeholder-gray-500 outline-none"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						{suggestions.length > 0 && (
							<ul className="absolute right-0 left-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
								{suggestions.map((region) => {
									let suggestionText = region.region;
									if (
										region.type === "city" &&
										cityRegionMapping[region.region]
									) {
										suggestionText = `${region.region}, region ${cityRegionMapping[region.region]}`;
									}
									return (
										<li
											key={`region2_${region.uuid}`}
											onClick={() => handleSelectSuggestion(region)}
											className="cursor-pointer px-4 py-2 hover:bg-gray-100"
										>
											{suggestionText}
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>

				{/*  <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Check In</label>
            <input
              type="date"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Check Out</label>
            <input
              type="date"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div> */}

				<button
					type="submit"
					className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
				>
					<Search size={20} />
					Procurar
				</button>
			</form>
		</div>
	);
}
