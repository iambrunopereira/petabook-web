"use client";

import { authClient } from "@repo/auth/client";
import { useActiveOrganization } from "@saas/organizations/hooks/use-active-organization";
import { SettingsItem } from "@saas/shared/components/SettingsItem";
import { useRouter } from "@shared/hooks/router";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@ui/components/alert-dialog";
import { Button } from "@ui/components/button";
import { useToast } from "@ui/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function DeleteOrganizationForm() {
	const t = useTranslations();
	const { toast } = useToast();
	const router = useRouter();
	const { activeOrganization, setActiveOrganization } = useActiveOrganization();
	const [submitting, setSubmitting] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);

	if (!activeOrganization) {
		return null;
	}

	const onSubmit = async () => {
		setSubmitting(true);
		await authClient.organization.delete(
			{
				organizationId: activeOrganization.id,
			},
			{
				onSuccess: () => {
					toast({
						variant: "success",
						title: t(
							"organizations.settings.notifications.organizationDeleted",
						),
					});
					router.replace("/app");
				},
				onError: () => {
					toast({
						variant: "error",
						title: t(
							"organizations.settings.notifications.organizationNotDeleted",
						),
					});
				},
			},
		);
		setActiveOrganization(null);
		router.refresh();
	};

	return (
		<>
			<SettingsItem
				danger
				title={t("organizations.settings.deleteOrganization.title")}
				description={t("organizations.settings.deleteOrganization.description")}
			>
				<div className="mt-4 flex justify-end">
					<Button variant="error" onClick={() => setShowConfirmation(true)}>
						{t("organizations.settings.deleteOrganization.submit")}
					</Button>
				</div>
			</SettingsItem>

			<AlertDialog
				open={showConfirmation}
				onOpenChange={(open) => setShowConfirmation(open)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="text-destructive">
							{t("organizations.settings.deleteOrganization.title")}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t("organizations.settings.deleteOrganization.confirmation")}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>
							{t("common.confirmation.cancel")}
						</AlertDialogCancel>
						<Button
							variant="error"
							loading={submitting}
							onClick={() => onSubmit()}
						>
							{t("organizations.settings.deleteOrganization.submit")}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
