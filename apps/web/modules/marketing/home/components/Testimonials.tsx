"use client";
import { useEffect, useState } from "react";

const testimonials = [
	{
		name: "Sarah & Bella 🐶",
		review:
			"This was the best stay for my dog! The hotel was super friendly and clean.",
		location: "Lisbon",
	},
	{
		name: "John & Max 🐕",
		review: "Max loved the backyard and play area. Highly recommended!",
		location: "Porto",
	},
	{
		name: "Emily & Charlie 🐾",
		review:
			"A wonderful experience! My cat was super comfortable and well cared for.",
		location: "Algarve",
	},
	{
		name: "Daniel & Coco 🐩",
		review: "Great service! The pet hotel had everything my dog needed.",
		location: "Madeira",
	},
];

export default function Testimonials() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % testimonials.length); // Loop through testimonials
		}, 5000); // Change every 5 seconds

		return () => clearInterval(interval); // Cleanup on unmount
	}, []);

	return (
		<div className="container mx-auto max-w-6xl py-12">
			<h2 className="mb-6 font-semibold text-2xl text-gray-800">Testemunhos</h2>
			{/* Testimonial Wrapper with Transition */}
			<div className="relative h-40 overflow-hidden">
				{testimonials.map((testimonial, i) => (
					<div
						key={i}
						className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
							i === index
								? "translate-y-0 opacity-100"
								: "translate-y-5 opacity-0"
						}`}
					>
						<div className="rounded-lg bg-white p-6 text-center shadow-lg">
							<p className="text-gray-700 italic">"{testimonial.review}"</p>
							<p className="mt-4 font-semibold text-sm">{testimonial.name}</p>
							<p className="text-gray-500 text-xs">{testimonial.location}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
