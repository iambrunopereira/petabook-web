import { config } from "@repo/config";
import { Footer } from "@saas/shared/components/Footer";
import { ColorModeToggle } from "@shared/components/ColorModeToggle";
import { LocaleSwitch } from "@shared/components/LocaleSwitch";
import { Logo } from "@shared/components/Logo";
import Link from "next/link";
import type { PropsWithChildren } from "react";

export function AuthWrapper({ children }: PropsWithChildren) {
	return (
		<div className="flex min-h-screen w-full py-6">
			<div className="flex w-full flex-col items-center justify-between gap-8">
				<div className="container">
					<div className="flex items-center justify-between">
						<Link href="/" className="block">
							<Logo />
						</Link>

						{/* <div className="flex items-center justify-end gap-2">
							{config.i18n.enabled && <LocaleSwitch withLocaleInUrl={false} />}
							<ColorModeToggle />
						</div> */}
					</div>
				</div>

				<main className="w-full max-w-md rounded-lg bg-card p-8 shadow">
					{children}
				</main>

				<Footer />
			</div>
		</div>
	);
}
