// components/hotelNew/ViewToggleDropdown.tsx
"use client";

import { ChevronDown, ChevronUp, LayoutGrid, List } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ViewType = "grid" | "list";

type Props = {
	view: ViewType;
	onChange: (view: ViewType) => void;
};

export default function ViewToggleDropdown({ view, onChange }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div ref={dropdownRef} className="relative w-full">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex w-full items-center justify-between rounded border bg-white px-3 py-2 shadow-sm hover:border-gray-400"
			>
				<div className="flex items-center gap-2">
					{view === "grid" ? <LayoutGrid size={16} /> : <List size={16} />}
					<span className="capitalize">
						{view === "list" ? "Lista" : "Grelha"}
					</span>
				</div>
				{isOpen ? (
					<ChevronUp size={16} className="text-gray-500" />
				) : (
					<ChevronDown size={16} className="text-gray-500" />
				)}
			</button>

			{isOpen && (
				<div className="absolute right-0 z-30 mt-2 w-full rounded border bg-white shadow-md">
					<button
						onClick={() => {
							onChange("grid");
							setIsOpen(false);
						}}
						className={`flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 ${
							view === "grid" ? "bg-gray-50 font-semibold" : ""
						}`}
					>
						<LayoutGrid size={16} /> Grelha
					</button>
					<button
						onClick={() => {
							onChange("list");
							setIsOpen(false);
						}}
						className={`flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 ${
							view === "list" ? "bg-gray-50 font-semibold" : ""
						}`}
					>
						<List size={16} /> Lista
					</button>
				</div>
			)}
		</div>
	);
}
