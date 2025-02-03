"use client";

import { useResumeSubscriptionMutation } from "@saas/payments/lib/api";
import { useRouter } from "@shared/hooks/router";
import { Button } from "@ui/components/button";
import { useToast } from "@ui/hooks/use-toast";
import { UndoIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function ResumeSubscriptionButton({
	purchaseId,
	label,
}: {
	purchaseId: string;
	label: string;
}) {
	const t = useTranslations();
	const router = useRouter();
	const { toast } = useToast();
	const resumeSubscriptionMutation = useResumeSubscriptionMutation();

	const resumeSubscription = async () => {
		try {
			await resumeSubscriptionMutation.mutateAsync({ purchaseId });
			toast({
				variant: "success",
				title: t(
					"settings.billing.resumeSubscription.notifications.success.title",
				),
			});
			router.refresh();
		} catch {
			toast({
				variant: "error",
				title: t(
					"settings.billing.resumeSubscription.notifications.error.title",
				),
			});
		}
	};

	return (
		<Button
			variant="outline"
			onClick={() => resumeSubscription()}
			loading={resumeSubscriptionMutation.isPending}
		>
			<UndoIcon className="mr-2 size-4" />
			{label}
		</Button>
	);
}
