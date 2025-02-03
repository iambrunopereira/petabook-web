import { type Config, config } from "@repo/config";
import { getActivePlanFromPurchases } from "@saas/payments/lib/active-plan";
import { usePurchasesQuery } from "@saas/payments/lib/api";
import type { PlanId } from "@saas/payments/types";

const plans = config.payments.plans as Config["payments"]["plans"];

export const usePurchases = (organizationId?: string) => {
	const { data: purchases } = usePurchasesQuery(organizationId);

	const activePlan = getActivePlanFromPurchases(purchases);

	const hasSubscription = (planIds?: PlanId[] | PlanId) => {
		return (
			!!activePlan &&
			(Array.isArray(planIds)
				? planIds.includes(activePlan.id)
				: planIds === activePlan.id)
		);
	};

	const hasPurchase = (planId: PlanId) => {
		return !!purchases?.some((purchase) =>
			Object.entries(plans)
				.find(([id, plan]) => id === planId)?.[1]
				.prices?.some((price) => price.productId === purchase.productId),
		);
	};

	return { purchases, activePlan, hasSubscription, hasPurchase };
};

export const useUserPurchases = () => usePurchases();

export const useOrganizationPurchases = (organizationId: string) =>
	usePurchases(organizationId);
