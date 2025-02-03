"use client";
import { SettingsItem } from "@saas/shared/components/SettingsItem";
import { useToast } from "@ui/hooks/use-toast";
import { useTranslations } from "next-intl";
import { UserAvatarUpload } from "./UserAvatarUpload";

export function UserAvatarForm() {
	const { toast } = useToast();
	const t = useTranslations();

	return (
		<SettingsItem
			title={t("settings.account.avatar.title")}
			description={t("settings.account.avatar.description")}
		>
			<UserAvatarUpload
				onSuccess={() => {
					toast({
						variant: "success",
						title: t("settings.account.avatar.notifications.success"),
					});
				}}
				onError={() => {
					toast({
						variant: "error",
						title: t("settings.account.avatar.notifications.error"),
					});
				}}
			/>
		</SettingsItem>
	);
}
