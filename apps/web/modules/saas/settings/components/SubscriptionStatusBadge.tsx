"use client";

import type { BadgeProps } from "@ui/components/badge";
import { Badge } from "@ui/components/badge";
import { useTranslations } from "next-intl";

export function SubscriptionStatusBadge({
	status,
}: {
	status: string;
	className?: string;
}) {
	const t = useTranslations();

	const badgeLabels: Record<string, string> = {
		active: t("settings.billing.subscription.status.active"),
		canceled: t("settings.billing.subscription.status.canceled"),
		expired: t("settings.billing.subscription.status.expired"),
		incomplete: t("settings.billing.subscription.status.incomplete"),
		past_due: t("settings.billing.subscription.status.past_due"),
		paused: t("settings.billing.subscription.status.paused"),
		trialing: t("settings.billing.subscription.status.trialing"),
		unpaid: t("settings.billing.subscription.status.unpaid"),
	};

	const badgeColors: Record<string, BadgeProps["status"]> = {
		active: "success",
		canceled: "error",
		expired: "error",
		incomplete: "warning",
		past_due: "warning",
		paused: "warning",
		trialing: "info",
		unpaid: "error",
	};

	return <Badge status={badgeColors[status]}>{badgeLabels[status]}</Badge>;
}
