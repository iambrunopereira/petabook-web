import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "./globals.css";
import "cropperjs/dist/cropper.css";

export const metadata: Metadata = {
	title: {
		absolute: "Petabook  - A melhor plataforma de hoteis caninos em Portugal",
		default: "Petabook - A melhor plataforma de hoteis caninos em Portugal",
		template:
			"%s | Petabook  - A melhor plataforma de hoteis caninos em Portugal",
	},
};

export default function RootLayout({ children }: PropsWithChildren) {
	return children;
}
