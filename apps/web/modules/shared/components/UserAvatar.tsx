import { config } from "@repo/config";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/avatar";
import { forwardRef, useMemo } from "react";

export const UserAvatar = forwardRef<
	HTMLSpanElement,
	{
		name: string;
		avatarUrl?: string | null;
		className?: string;
	}
>(({ name, avatarUrl, className }, ref) => {
	const initials = useMemo(
		() =>
			name
				.split(" ")
				.slice(0, 2)
				.map((n) => n[0])
				.join(""),
		[name],
	);

	const avatarSrc = useMemo(() => {
		if (!avatarUrl) return undefined;

		// Check if the avatarUrl is a Base64 string
		if (avatarUrl.startsWith("data:image/")) {
			return avatarUrl; // Use Base64 directly
		}

		// Otherwise, assume it's a regular URL or proxy path
		return avatarUrl.startsWith("http")
			? avatarUrl
			: `/image-proxy/${config.storage.bucketNames.avatars}/${avatarUrl}`;
	}, [avatarUrl]);

	return (
		<Avatar ref={ref} className={className}>
			<AvatarImage src={avatarSrc} />
			<AvatarFallback className="bg-secondary/10 text-secondary">
				{initials}
			</AvatarFallback>
		</Avatar>
	);
});

UserAvatar.displayName = "UserAvatar";
