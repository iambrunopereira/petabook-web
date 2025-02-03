import { LocaleLink } from "@i18n/routing";
import { Logo } from "@shared/components/Logo";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t py-8 text-foreground/60 text-sm">
			<div className="container grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div>
					<Logo className="opacity-70 grayscale" />
					<p className="mt-3 text-sm opacity-70">
						© {new Date().getFullYear()} Petabook. All rights reserved.
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<LocaleLink href="/blog" className="block">
						Blog
          </LocaleLink>
          <LocaleLink href="/legal/terms" className="block">
						Terms and conditions
          </LocaleLink>
          <LocaleLink href="/contact" className="block">
						Contact
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
          <div className="flex mb-2 gap-3">
            <Link href="https://instagram.com">
							<Instagram className="size-5 grayscale text-primary hover:!grayscale-0" />
						</Link>
            <Link href="https://facebook.com">
					    <Facebook className="size-5 grayscale text-primary hover:!grayscale-0" />
						</Link>

          </div>
          <p className="text-sm opacity-70">
						+351 914 422 847
          </p>
          <p className="text-sm opacity-70">
						hello@petabook.com
					</p>

				</div>
			</div>
		</footer>
	);
}
