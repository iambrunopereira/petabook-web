"use client";

import { usePlanData } from "@saas/payments/hooks/plan-data";
import { usePurchases } from "@saas/payments/hooks/purchases";
import { SettingsItem } from "@saas/shared/components/SettingsItem";
import { BadgeCheckIcon, CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { CancelSubscriptionButton } from "../../settings/components/CancelSubscriptionButton";
import { CustomerPortalButton } from "../../settings/components/CustomerPortalButton";
import { SubscriptionStatusBadge } from "../../settings/components/SubscriptionStatusBadge";

export function ActivePlan({
	organizationId,
}: {
	organizationId?: string;
}) {
	const t = useTranslations();
	const { planData } = usePlanData();
	const { activePlan } = usePurchases(organizationId);

	if (!activePlan) {
		return null;
	}

	const activePlanData = planData[activePlan.id as keyof typeof planData];

	return (
		<SettingsItem title={t("settings.billing.subscription.title")}>
			<div key={activePlan.id} className="rounded-lg border p-4">
				<div className="">
					<div className="flex items-center gap-2">
						<BadgeCheckIcon className="size-6 text-primary" />
						<h4 className="font-bold text-lg text-primary">
							<span>{activePlanData.title}</span>
						</h4>
						{activePlan.status && (
							<SubscriptionStatusBadge status={activePlan.status} />
						)}
					</div>

					{!!activePlanData.features?.length && (
						<ul className="mt-2 grid list-none gap-2 text-sm">
							{activePlanData.features.map((feature, key) => (
								<li key={key} className="flex items-center justify-start">
									<CheckIcon className="mr-2 size-4 text-primary" />
									<span>{feature}</span>
								</li>
							))}
						</ul>
					)}
				</div>

				{"purchaseId" in activePlan && (
					<div className="mt-4 flex justify-end">
						<div className="flex w-full flex-col flex-wrap gap-2 md:flex-row">
							<CustomerPortalButton purchaseId={activePlan.purchaseId} />
							<CancelSubscriptionButton
								purchaseId={activePlan.purchaseId}
								label={t("settings.billing.subscription.cancel")}
							/>
						</div>
					</div>
				)}
			</div>
		</SettingsItem>
	);
}
