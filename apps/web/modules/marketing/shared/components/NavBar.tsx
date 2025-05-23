"use client";

import { LocaleLink, useLocalePathname } from "@i18n/routing";
import { config } from "@repo/config";
import { useSession } from "@saas/auth/hooks/use-session";
import { Button } from "@ui/components/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@ui/components/sheet";
import { cn } from "@ui/lib";
import { MenuIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

export function NavBar() {
	const t = useTranslations();
	const { user } = useSession();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const localePathname = useLocalePathname();
	const [isTop, setIsTop] = useState(true);

	const debouncedScrollHandler = useDebounceCallback(
		() => {
			setIsTop(window.scrollY <= 10);
		},
		150,
		{
			maxWait: 150,
		},
	);

	useEffect(() => {
		window.addEventListener("scroll", debouncedScrollHandler);
		debouncedScrollHandler();
		return () => {
			window.removeEventListener("scroll", debouncedScrollHandler);
		};
	}, [debouncedScrollHandler]);

	useEffect(() => {
		setMobileMenuOpen(false);
	}, [localePathname]);

	const isDocsPage = localePathname.startsWith("/docs");

	const menuItems: {
		label: string;
		href: string;
	}[] = [
		/* {
			label: t("common.menu.pricing"),
			href: "/#pricing",
		},
		{
			label: t("common.menu.faq"),
			href: "/#faq",
		}, */
		/* {
			label: t("common.menu.blog"),
			href: "/blog",
		}, */
		/* {
			label: t("common.menu.changelog"),
			href: "/changelog",
		}, */
		/* ...(config.contactForm.enabled
			? [
					{
						label: t("common.menu.contact"),
						href: "/contact",
					},
				]
			: []), */
		/* {
			label: t("common.menu.docs"),
			href: "/docs",
		}, */
	];

	const isMenuItemActive = (href: string) => localePathname.startsWith(href);

	return (
		<nav
			className={cn(
				" top-0 left-0 z-[9999] w-full transition-shadow duration-200",
				!isTop || isDocsPage
					? "bg-card/80 shadow-sm backdrop-blur-lg"
					: "shadow-none",
			)}
			data-test="navigation"
		>
			<div className="container">
				<div
					className={cn(
						"flex items-center justify-stretch gap-6 transition-[padding] duration-200",
						!isTop || isDocsPage ? "py-4" : "py-6",
					)}
				>
					<div className="flex flex-1 justify-start">
						<LocaleLink
							href="/"
							className="block hover:no-underline active:no-underline"
						>
							{/* <Logo />
							sad */}
							<Image
								src="/images/assets/logo.png"
								alt="Petabook"
								fill
								className="!h-8 !w-40 !relative"
								priority
							/>
						</LocaleLink>
					</div>

					<div className="hidden flex-1 items-center justify-center md:flex">
						{menuItems.map((menuItem) => (
							<LocaleLink
								key={menuItem.href}
								href={menuItem.href}
								className={cn(
									"block px-3 py-2 font-medium text-foreground/80 text-sm",
									isMenuItemActive(menuItem.href)
										? "font-bold text-foreground"
										: "",
								)}
							>
								{menuItem.label}
							</LocaleLink>
						))}
					</div>

					<div className="flex flex-1 items-center justify-end gap-3">
						{/* <ColorModeToggle /> */}
						{/* {config.i18n.enabled && <LocaleSwitch />} */}

						<Sheet
							open={mobileMenuOpen}
							onOpenChange={(open) => setMobileMenuOpen(open)}
						>
							<SheetTrigger asChild>
								<Button
									className="md:hidden"
									size="icon"
									variant="outline"
									aria-label="Menu"
								>
									<MenuIcon className="size-4" />
								</Button>
							</SheetTrigger>
							<SheetContent className="z-[99999] w-[280px]" side="right">
								<SheetTitle />
								<div className="flex flex-col items-start justify-center ">
									{menuItems.map((menuItem) => (
										<LocaleLink
											key={menuItem.href}
											href={menuItem.href}
											className={cn(
												"block px-3 py-2 font-medium text-base text-foreground/80",
												isMenuItemActive(menuItem.href)
													? "font-bold text-foreground"
													: "",
											)}
										>
											{menuItem.label}
										</LocaleLink>
									))}
									<NextLink
										key={"partner-button"}
										target="_blank"
										href={
											"https://docs.google.com/forms/d/e/1FAIpQLSdkBUeU2VgiVBdKPQ9nhEFj5kLSoh4SsOwvE2DWD4_YV9Vz1Q/viewform?usp=header"
										}
										className="block px-3 py-2 text-base"
									>
										Registe o seu estabelecimento
									</NextLink>
									{/* <NextLink
										key={user ? "start" : "login"}
										href={user ? "/app" : "/auth/login"}
										className="block px-3 py-2 text-base"
										prefetch={!user}
									>
										{user ? t("common.menu.dashboard") : t("common.menu.login")}
									</NextLink> */}
								</div>
							</SheetContent>
						</Sheet>
						<Button
							key="partner-button"
							className="hidden md:flex"
							asChild
							variant="secondary"
						>
							<NextLink
								target="_blank"
								href="https://docs.google.com/forms/d/e/1FAIpQLSdkBUeU2VgiVBdKPQ9nhEFj5kLSoh4SsOwvE2DWD4_YV9Vz1Q/viewform?usp=header"
							>
								Registe o seu estabelecimento
							</NextLink>
						</Button>
						{config.ui.saas.enabled &&
							(user ? (
								<Button
									key="dashboard"
									className="hidden md:flex"
									asChild
									variant="secondary"
								>
									<NextLink href="/app">{t("common.menu.dashboard")}</NextLink>
								</Button>
							) : (
								<Button
									key="login"
									className="hidden md:flex"
									asChild
									variant="secondary"
								>
									<NextLink href="/auth/login">
										{t("common.menu.login")}
									</NextLink>
								</Button>
							))}
					</div>
				</div>
			</div>
		</nav>
	);
}
