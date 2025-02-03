"use client";

import { useCancelSubscriptionMutation } from "@saas/payments/lib/api";
import { useRouter } from "@shared/hooks/router";
import { Button } from "@ui/components/button";
import { useToast } from "@ui/hooks/use-toast";
import { XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function CancelSubscriptionButton({
	purchaseId,
	label,
}: {
	purchaseId: string;
	label: string;
}) {
	const t = useTranslations();
	const router = useRouter();
	const { toast } = useToast();
	const cancelSubscriptionMutation = useCancelSubscriptionMutation();

	const cancelSubscription = async () => {
		try {
			await cancelSubscriptionMutation.mutateAsync({ purchaseId });
			toast({
				variant: "success",
				title: t(
					"settings.billing.cancelSubscription.notifications.success.title",
				),
			});
			router.refresh();
		} catch {
			toast({
				variant: "error",
				title: t(
					"settings.billing.cancelSubscription.notifications.error.title",
				),
			});
		}
	};

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={() => cancelSubscription()}
			loading={cancelSubscriptionMutation.isPending}
		>
			<XIcon className="mr-1.5 size-4" />
			{label}
		</Button>
	);
}
