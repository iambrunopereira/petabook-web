import * as Slider from "@radix-ui/react-slider";

type PriceRangeProps = {
	value: [number, number];
	onChange: (range: [number, number]) => void;
	min?: number;
	max?: number;
	step?: number;
};

export function PriceRangeSlider({
	value,
	onChange,
	min = 0,
	max = 30,
	step = 1,
}: PriceRangeProps) {
	return (
		<div className="mb-4 w-full">
			<label className="mb-1 block font-medium text-gray-600">Preço (€)</label>
			<Slider.Root
				className="relative flex w-full touch-none select-none items-center"
				min={min}
				max={max}
				step={step}
				value={value}
				onValueChange={(val) => onChange([val[0], val[1]])}
			>
				<Slider.Track className="relative h-2 grow rounded-full bg-gray-200">
					<Slider.Range className="absolute h-full rounded-full bg-blue-500" />
				</Slider.Track>
				<Slider.Thumb className="block h-5 w-5 rounded-full border border-gray-400 bg-white shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
				<Slider.Thumb className="block h-5 w-5 rounded-full border border-gray-400 bg-white shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
			</Slider.Root>
			<div className="mt-2 text-gray-600 text-sm">
				De <strong>{value[0]}€</strong> até <strong>{value[1]}€</strong>
			</div>
		</div>
	);
}
