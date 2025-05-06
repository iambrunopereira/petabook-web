import { config } from "@repo/config";
import { ApiClientProvider } from "@shared/components/ApiClientProvider";
import { Toaster } from "@ui/components/toaster";
import { cn } from "@ui/lib";
import { Provider as JotaiProvider } from "jotai";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { PropsWithChildren } from "react";
import { AnalyticsScript } from "../../analytics/provider/google";

export const metadata: Metadata = {
	title: {
		absolute: "Petabook  - Application",
		default: "Petabook - Application",
		template: "%s | Petabook  - Application",
	},
};

const sansFont = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-sans",
});

export function Document({
	children,
	locale,
}: PropsWithChildren<{ locale: string }>) {
	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<AnalyticsScript />
			</head>
			<body
				className={cn(
					"min-h-screen bg-background font-sans text-foreground antialiased",
					sansFont.variable,
				)}
			>
				<NuqsAdapter>
					<NextTopLoader color="var(--colors-primary)" />
					<ThemeProvider
						attribute="class"
						disableTransitionOnChange
						enableSystem
						defaultTheme={config.ui.defaultTheme}
						themes={config.ui.enabledThemes}
					>
						<ApiClientProvider>
							<JotaiProvider>{children}</JotaiProvider>
						</ApiClientProvider>
					</ThemeProvider>
					<Toaster />
				</NuqsAdapter>
			</body>
		</html>
	);
}
