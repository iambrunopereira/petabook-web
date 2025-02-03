import { ActivePlan } from "@saas/payments/components/ActivePlan";
import { ChangePlan } from "@saas/payments/components/ChangePlan";
import { getActivePlanFromPurchases } from "@saas/payments/lib/active-plan";
import { purchasesQueryKey } from "@saas/payments/lib/api";
import { getPurchases } from "@saas/payments/lib/server";
import { SettingsList } from "@saas/shared/components/SettingsList";
import { getQueryClient } from "@shared/lib/server";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations();

	return {
		title: t("settings.billing.title"),
	};
}

export default async function BillingSettingsPage() {
	const purchases = await getPurchases();
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: purchasesQueryKey(),
		queryFn: () => purchases,
	});

	const activePlan = getActivePlanFromPurchases(purchases);

	return (
		<SettingsList>
			{activePlan && <ActivePlan />}
			<ChangePlan activePlanId={activePlan?.id} />
		</SettingsList>
	);
}
