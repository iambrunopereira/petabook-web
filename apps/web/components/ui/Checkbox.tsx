import { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				type="checkbox"
				ref={ref}
				className={`h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ${className}`}
				{...props}
			/>
		);
	},
);

Checkbox.displayName = "Checkbox";
