"use client";

import { useSession } from "@saas/auth/hooks/use-session";
import { useActiveOrganization } from "@saas/organizations/hooks/use-active-organization";
import { PricingTable } from "@saas/payments/components/PricingTable";
import { SettingsItem } from "@saas/shared/components/SettingsItem";
import { useTranslations } from "next-intl";

export function ChangePlan({ activePlanId }: { activePlanId?: string }) {
	const t = useTranslations();
	const { user } = useSession();
	const { activeOrganization } = useActiveOrganization();

	return (
		<SettingsItem
			title={t("settings.billing.subscription.changePlan.title")}
			description={t("settings.billing.subscription.changePlan.description")}
		>
			<PricingTable
				organizationId={activeOrganization?.id}
				userId={user?.id}
				activePlanId={activePlanId}
			/>
		</SettingsItem>
	);
}
