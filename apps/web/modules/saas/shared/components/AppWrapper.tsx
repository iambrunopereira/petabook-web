import { config } from "@repo/config";
import { NavBar } from "@saas/shared/components/NavBar";
import { cn } from "@ui/lib";
import type { PropsWithChildren } from "react";

export function AppWrapper({ children }: PropsWithChildren) {
	return (
		<div
			className={cn(
				"bg-[radial-gradient(farthest-corner_at_0%_0%,rgba(var(--colors-primary-rgb),0.075)_0%,var(--colors-background)_50%)] dark:bg-[radial-gradient(farthest-corner_at_0%_0%,rgba(var(--colors-primary-rgb),0.1)_0%,var(--colors-background)_50%)]",
				[config.ui.saas.useSidebarLayout ? "" : ""],
			)}
		>
			<NavBar />
			<div
				className={cn(" px-0 ", [
					config.ui.saas.useSidebarLayout
						? "min-h-[calc(100vh-1rem)] md:ml-[280px]"
						: "",
				])}
			>
				<main
					className={cn("container max-w-6xl py-6", [
						config.ui.saas.useSidebarLayout ? "" : "",
					])}
				>
					{children}
				</main>
			</div>
		</div>
	);
}
