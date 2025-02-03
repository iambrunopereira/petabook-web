import { LocaleLink } from "@i18n/routing";
import { Button } from "@ui/components/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImageDark from "../../../../public/images/hero-image-dark.png";
import heroImage from "../../../../public/images/hero-image.png";

export function Partners() {
	return (
		<div className="relative max-w-full overflow-x-hidden ">

			<div className="container relative z-20 pb-12 text-center">


				<div className="mt-16 px-8 text-center">
					<h5 className="font-semibold text-foreground/50 text-xs uppercase tracking-wider">
						Our parterns
					</h5>

          <div className="mt-4 flex flex-col-reverse items-center justify-center gap-4 text-foreground/50 md:flex-row md:gap-8">
            <div className="aspect-[512/64] h-5 w-auto">
              <Image
										src="/images/assets/partners/animalife-logo.png"
										alt=""
                width={650}
                height={750}
									/>
            </div>

					</div>
				</div>
			</div>
		</div>
	);
}
