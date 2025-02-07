"use client";
import { useEffect, useState } from "react";

const testimonials = [
	{
		name: "Sarah & Bella 🐶",
		review:
			"Esta foi a melhor estadia para o meu cão! O hotel era super acolhedor e limpo.",
		location: "Lisboa",
	},
	{
		name: "João & Max 🐕",
		review:
			"O Max adorou o quintal e a área de brincadeiras. Recomendo vivamente!",
		location: "Porto",
	},
	{
		name: "Emília & Charlie 🐾",
		review:
			"Uma experiência maravilhosa! O meu gato esteve super confortável e bem cuidado.",
		location: "Algarve",
	},
	{
		name: "Daniel & Coco 🐩",
		review:
			"Ótimo serviço! O hotel para animais tinha tudo o que o meu cão precisava.",
		location: "Madeira",
	},
	{
		name: "Beatriz & Nala 🐕‍🦺",
		review:
			"Fiquei muito satisfeita com os cuidados prestados. A Nala foi tratada como uma rainha!",
		location: "Coimbra",
	},
	{
		name: "Rui & Thor 🐾",
		review:
			"Espaço incrível, funcionários muito simpáticos. O Thor adorou cada momento!",
		location: "Braga",
	},
	{
		name: "Ana & Luna 🐈",
		review:
			"Foi a primeira vez que deixei a minha gata num hotel e não podia estar mais feliz. Serviço excelente!",
		location: "Faro",
	},
	{
		name: "Carlos & Simba 🐕",
		review:
			"Muito profissionalismo e carinho pelos animais. O Simba já quer voltar!",
		location: "Évora",
	},
	{
		name: "Marta & Bolinha 🐹",
		review:
			"Até o meu pequeno Bolinha foi bem tratado! Adorei a atenção aos detalhes.",
		location: "Aveiro",
	},
	{
		name: "Tiago & Rex 🐶",
		review:
			"Estadia perfeita! O Rex divertiu-se imenso e veio para casa super feliz.",
		location: "Viana do Castelo",
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
