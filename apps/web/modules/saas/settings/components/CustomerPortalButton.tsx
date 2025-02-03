"use client";

import { useCreateCustomerPortalLinkMutation } from "@saas/payments/lib/api";
import { Button } from "@ui/components/button";
import { useToast } from "@ui/hooks/use-toast";
import { CreditCardIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function CustomerPortalButton({
	purchaseId,
}: {
	purchaseId: string;
}) {
	const t = useTranslations();
	const { toast } = useToast();
	const createCustomerPortalMutation = useCreateCustomerPortalLinkMutation();

	const createCustomerPortal = async () => {
		try {
			const { customerPortalLink } =
				await createCustomerPortalMutation.mutateAsync({
					purchaseId,
					redirectUrl: window.location.href,
				});

			window.location.href = customerPortalLink;
		} catch {
			toast({
				variant: "error",
				title: t(
					"settings.billing.createCustomerPortal.notifications.error.title",
				),
			});
		}
	};

	return (
		<Button
			variant="outline"
			size="sm"
			onClick={() => createCustomerPortal()}
			loading={createCustomerPortalMutation.isPending}
		>
			<CreditCardIcon className="mr-2 size-4" />
			{t("settings.billing.createCustomerPortal.label")}
		</Button>
	);
}
