"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@repo/auth/client";
import { useSession } from "@saas/auth/hooks/use-session";
import { SettingsItem } from "@saas/shared/components/SettingsItem";
import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { useToast } from "@ui/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	address: z.string(),
	postalCode: z.string(),
	city: z.string(),
	country: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

export function ChangeAddressForm() {
	const { user, reloadSession } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const { toast } = useToast();
	const t = useTranslations();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			address: user?.address ?? "",
			postalCode: user?.postalCode ?? "",
			city: user?.city ?? "",
			country: user?.country ?? "",
		},
	});

	const onSubmit = form.handleSubmit(
		async ({ address, postalCode, city, country }) => {
			setSubmitting(true);

			await authClient.updateUser(
				{ address, postalCode, city, country },
				{
					onSuccess: () => {
						toast({
							variant: "success",
							title: t("settings.account.changeAddress.notifications.success"),
						});

						reloadSession();
						form.reset({
							address,
							postalCode,
							city,
							country,
						});
					},
					onError: () => {
						toast({
							variant: "error",
							title: t("settings.account.changeAddress.notifications.error"),
						});
					},
					onResponse: () => {
						setSubmitting(false);
					},
				},
			);
		},
	);
	console.log(
		"form",
		form.formState.dirtyFields,
		!form.formState.isValid,
		!form.formState.isValid ||
			!form.formState.dirtyFields.address ||
			!form.formState.dirtyFields.postalCode ||
			!form.formState.dirtyFields.city ||
			!form.formState.dirtyFields.country,
	);

	const requiredFields = ["address", "postalCode", "city", "country"];
	const hasInvalidDirtyField = requiredFields.some(
		(field) =>
			Object.prototype.hasOwnProperty.call(form.formState.dirtyFields, field) &&
			!form.formState.dirtyFields[
				field as keyof typeof form.formState.dirtyFields
			],
	);
	return (
		<SettingsItem title={t("settings.account.changeAddress.title")}>
			<form onSubmit={onSubmit}>
				<Input type="text" {...form.register("address")} />
				<div className="mt-4 flex gap-4">
					<Input type="text" {...form.register("postalCode")} />
					<Input type="text" {...form.register("city")} />
					<Input type="text" {...form.register("country")} />
				</div>

				<div className="mt-4 flex justify-end">
					<Button
						type="submit"
						loading={submitting}
						disabled={!form.formState.isValid || hasInvalidDirtyField}
					>
						{t("settings.save")}
					</Button>
				</div>
			</form>
		</SettingsItem>
	);
}
