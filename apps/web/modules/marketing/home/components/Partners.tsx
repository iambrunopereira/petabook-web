import Image from "next/image";

export function Partners() {
	return (
		<div className="relative max-w-full overflow-x-hidden ">
			<div className="container relative z-20 pb-12 text-center">
				<div className="mt-16 px-8 text-center">
					<h5 className="font-semibold text-foreground/50 text-xs uppercase tracking-wider">
						Os nossos parceiros
					</h5>

					<div className="mt-4 flex flex-col-reverse items-center justify-center gap-12 text-foreground/50 md:flex-row md:gap-8">
						<div className=" aspect-[512/64] h-5 w-auto items-center justify-center">
							<Image
								src="/images/assets/partners/animalife-logo.png"
								alt=""
								width={650}
								height={750}
							/>
						</div>
						<div className=" aspect-[512/64] h-5 w-auto items-center">
							<Image
								src="/images/assets/partners/vsf-pt.png"
								alt=""
								width={50}
								height={50}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
