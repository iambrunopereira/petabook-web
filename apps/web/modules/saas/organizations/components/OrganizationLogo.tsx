import { config } from "@repo/config";
import { lightVariables } from "@repo/tailwind-config";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import BoringAvatar from "boring-avatars";
import { forwardRef, useMemo } from "react";

export const OrganizationLogo = forwardRef<
	HTMLSpanElement,
	{
		name: string;
		logoUrl?: string | null;
		className?: string;
	}
>(({ name, logoUrl, className }, ref) => {
	const logoSrc = useMemo(
		() =>
			logoUrl
				? logoUrl.startsWith("http")
					? logoUrl
					: `/image-proxy/${config.storage.bucketNames.avatars}/${logoUrl}`
				: undefined,
		[logoUrl],
	);

	return (
		<Avatar ref={ref} className={className}>
			<AvatarImage src={logoSrc} />
			<AvatarFallback>
				<BoringAvatar
					size={96}
					name={name}
					variant="marble"
					colors={[
						lightVariables.colors.primary,
						lightVariables.colors.accent,
						lightVariables.colors.highlight,
					]}
					square
				/>
			</AvatarFallback>
		</Avatar>
	);
});

OrganizationLogo.displayName = "OrganizationLogo";
