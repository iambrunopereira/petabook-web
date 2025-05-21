import { forwardRef } from "react";

interface ToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
	({ className, ...props }, ref) => {
		return (
			<label className="relative inline-flex cursor-pointer items-center">
				<input type="checkbox" ref={ref} className="peer sr-only" {...props} />
				<div className="peer h-6 w-11 rounded-full bg-gray-200 transition-all peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary"></div>
				<span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-5"></span>
			</label>
		);
	},
);

Toggle.displayName = "Toggle";
