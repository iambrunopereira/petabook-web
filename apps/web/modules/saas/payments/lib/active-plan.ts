import { type Config, config } from "@repo/config";
import type { PlanId } from "@saas/payments/types";
import type { apiClient } from "@shared/lib/api-client";
import type { InferResponseType } from "hono";

type Purchases = InferResponseType<typeof apiClient.payments.purchases.$get>;

const plans = config.payments.plans as Config["payments"]["plans"];

export function getActivePlanFromPurchases(purchases?: Purchases) {
	const subscriptionPurchase = purchases?.find(
		(purchase) => purchase.type === "SUBSCRIPTION",
	);

	const freePlan = Object.entries(plans).find(([planId, plan]) => plan.isFree);
	const freePlanData = freePlan
		? {
				id: freePlan[0] as PlanId,
				status: "active",
			}
		: null;

	if (!subscriptionPurchase) {
		return freePlanData;
	}

	const activePlan = Object.entries(plans).find(([_, plan]) =>
		plan.prices?.some(
			(price) => price.productId === subscriptionPurchase.productId,
		),
	);

	if (!activePlan) {
		return freePlanData;
	}

	return {
		id: activePlan[0] as PlanId,
		status: subscriptionPurchase.status,
		purchaseId: subscriptionPurchase.id,
	};
}
