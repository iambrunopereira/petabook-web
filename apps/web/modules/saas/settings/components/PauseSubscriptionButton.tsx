"use client";

import { usePauseSubscriptionMutation } from "@saas/payments/lib/api";
import { useRouter } from "@shared/hooks/router";
import { Button } from "@ui/components/button";
import { useToast } from "@ui/hooks/use-toast";
import { PauseIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function PauseSubscriptionButton({
	purchaseId,
}: { purchaseId: string }) {
	const t = useTranslations();
	const router = useRouter();
	const { toast } = useToast();
	const pauseSubscriptionMutation = usePauseSubscriptionMutation();

	const pauseSubscription = async () => {
		try {
			await pauseSubscriptionMutation.mutateAsync({ purchaseId });
			toast({
				variant: "success",
				title: t(
					"settings.billing.pauseSubscription.notifications.success.title",
				),
			});
			router.refresh();
		} catch {
			toast({
				variant: "error",
				title: t(
					"settings.billing.pauseSubscription.notifications.error.title",
				),
			});
		}
	};

	return (
		<Button
			variant="outline"
			onClick={() => pauseSubscription()}
			loading={pauseSubscriptionMutation.isPending}
		>
			<PauseIcon className="mr-2 size-4" />
			{t("settings.billing.pauseSubscription.label")}
		</Button>
	);
}
