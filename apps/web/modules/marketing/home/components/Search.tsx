"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Region, regionList } from "@marketing/db/regions";

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
      r.region.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filtered);
  }, [search]);

  const handleSelectSuggestion = (region: Region) => {
    setSuggestions([]);
    let suggestionText = region.region;/*
    if (region.type === "city" && cityRegionMapping[region.region]) {
      suggestionText = `${region.region}, region ${cityRegionMapping[region.region]}`;
    } */
    setSearch(suggestionText);

  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim() /* || !checkIn || !checkOut */) return;
    router.push(
      `/search?location=${encodeURIComponent(search.toLowerCase())}&checkIn=${encodeURIComponent(
        checkIn
      )}&checkOut=${encodeURIComponent(checkOut)}`
    );
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-2xl bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-4 flex flex-col gap-4"
      >
        <div className="flex items-center gap-2">
          <MapPin className="text-gray-500" size={20} />
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for a pet-friendly region..."
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500 px-4 py-3 rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                {suggestions.map((region) => {
                  let suggestionText = region.region;
                  if (region.type === "city" && cityRegionMapping[region.region]) {
                    suggestionText = `${region.region}, region ${cityRegionMapping[region.region]}`;
                  }
                  return (
                    <li
                      key={region.uuid}
                      onClick={() => handleSelectSuggestion(region)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
        >
          <Search size={20} />
          Search
        </button>
      </form>
    </div>
  );
}
