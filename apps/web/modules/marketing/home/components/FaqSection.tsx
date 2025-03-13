"use client";

import { cn } from "@ui/lib";
import { useState } from "react";

export function FaqSection({ className }: { className?: string }) {
	const items = [
		{
			question: "O que são Hotéis Parceiros Petabook.com?",
			answer:
				"A Petabook.com colabora com hotéis caninos de confiança, onde os visitantes do nosso website podem realizar pré-reservas diretamente na nossa plataforma. Estes hotéis são cuidadosamente selecionados pela Petabook.com, pois a nossa equipa mantém um contacto próximo e regular com os proprietários e colaboradores desses estabelecimentos. Confie na qualidade e segurança dos nossos parceiros e faça a sua reserva com a Petabook.com para garantir o melhor cuidado para o seu cão.",
		},
		{
			question: "É perigoso deixar o meu cão num hotel?",
			answer:
				"Se deixar num estabelecimento de confiança, como os que são apresentados na Petabook.com, não há qualquer tipo de risco em deixar o seu cão num hotel canino. Várias medidas são tomadas para minimizar a má adaptação do seu animal com os restantes. Os profissionais neste setor estão treinados e habituados em facilitar a socialização entre os cães. Por norma, é habitual darem feedback aos donos sobre o processo de integração do cão no hotel.",
		},
		{
			question: "Como posso acompanhar o meu cão durante a estadia?",
			answer:
				"Os hotéis para cães, através das redes sociais ou diretamente para os donos, costumam ir mostrando fotografias dos cães hospedados. Pode pedir, se não for mencionado, para ter essa atenção.",
		},
		{
			question: "Como sei que o meu cão está a gostar da estadia?",
			answer:
				"É muito frequente os Hotéis Caninos disponibilizarem-se para ir partilhando fotografias do seu cão. Pode perguntar ou pedir ajuda de um especialista do Petabook.com para poder ter essa questão assegurada. Além disso, as recomendações e comentários de um estabelecimento devem ser critérios quando está a escolher a estadia do seu animal de estimação.",
		},
		{
			question: "Quais são os requisitos para a estadia do meu cão?",
			answer:
				"Todos os cães devem estar atualizados com as vacinas, incluindo raiva, DHPP e bordetella. Além disso, recomendamos uma desparasitação recente.",
		},
		{
			question: "Quais as rotinas diárias de um cão hospedado num hotel?",
			answer:
				"A rotina inclui passeios regulares, tempo de brincadeira, sessões de socialização com outros cães e tempos de descanso (os cães adoram sestas, como todos sabemos).",
		},
		{
			question: "Há assistência veterinária disponível?",
			answer:
				"Por norma, os hotéis para cães têm uma assistente com capacidades veterinárias para poder assistir os animais para uma eventual urgência. Os próprios profissionais estão treinados para poder assistir os animais domésticos com aquilo que precisam.",
		},
	];

	// State to track which FAQ items are expanded.
	const [openItems, setOpenItems] = useState<boolean[]>(
		new Array(items.length).fill(false),
	);

	const toggleItem = (index: number) => {
		setOpenItems((prev) => {
			const newState = [...prev];
			newState[index] = !newState[index];
			return newState;
		});
	};

	return (
		<section
			id="faq"
			className={cn("scroll-mt-20 border-t py-12 lg:py-16", className)}
		>
			<div className="container max-w-5xl">
				<div className="mb-12 lg:text-center">
					<h1 className="mb-2 font-bold text-4xl lg:text-5xl">FAQ</h1>
					<p className="text-lg opacity-50">Perguntas frequentes</p>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					{items.map((item, i) => (
						<div
							key={`faq-item-${i}`}
							className="rounded-lg border p-4 transition-all duration-300 lg:p-6"
						>
							<button
								className="w-full text-left focus:outline-none"
								onClick={() => toggleItem(i)}
							>
								<div className="flex items-center justify-between">
									<h4 className="font-semibold text-lg">{item.question}</h4>
									<span className="text-2xl">{openItems[i] ? "−" : "+"}</span>
								</div>
							</button>
							{openItems[i] && (
								<p className="mt-2 text-foreground/60">{item.answer}</p>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
