import { LocaleLink } from "@i18n/routing";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
	return (
		<footer className="border-t py-8 text-foreground/60 text-sm">
			<div className="container grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div>
					<Image
						src="/images/assets/logo.png"
						alt="Petabook"
						fill
						className="!h-8 !w-44 !relative opacity-70 grayscale"
						priority
					/>
					<p className="mt-3 text-sm opacity-70">
						© {new Date().getFullYear()} Petabook. Todos os direitos reservados.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					{/* <LocaleLink href="/blog" className="block">
						Blog
					</LocaleLink> */}
					<LocaleLink href="/legal/terms" className="block">
						Termos e condições
					</LocaleLink>
					<LocaleLink href="/contact" className="block">
						Contacto
					</LocaleLink>
					{/*
					<a href="#features" className="block">
						Features
					</a> */}

					{/* <a href="/#pricing" className="block">
						Pricing
					</a> */}
				</div>

				<div className="flex flex-col gap-2 ">
					{/* <LocaleLink href="/legal/privacy-policy" className="block">
						Privacy policy
					</LocaleLink> */}
					<div className="mb-2 flex gap-3">
						<Link href="https://instagram.com">
							<Instagram className="hover:!grayscale-0 size-5 text-primary grayscale" />
						</Link>
						<Link href="https://facebook.com">
							<Facebook className="hover:!grayscale-0 size-5 text-primary grayscale" />
						</Link>
					</div>
					<p className="text-sm opacity-70">+351 914 422 847</p>
					<p className="text-sm opacity-70">geral@petabook.com</p>
				</div>
			</div>
		</footer>
	);
}
