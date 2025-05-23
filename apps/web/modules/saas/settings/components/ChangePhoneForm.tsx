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
	phone: z.string().min(3),
});

type FormSchema = z.infer<typeof formSchema>;

export function ChangePhoneForm() {
	const { user, reloadSession } = useSession();
	const [submitting, setSubmitting] = useState(false);
	const { toast } = useToast();
	const t = useTranslations();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			phone: user?.phone ?? "",
		},
	});

	const onSubmit = form.handleSubmit(async ({ phone }) => {
		setSubmitting(true);

		await authClient.updateUser(
			{ phone },
			{
				onSuccess: () => {
					toast({
						variant: "success",
						title: t("settings.account.changeName.notifications.success"),
					});

					reloadSession();
					form.reset({
						phone,
					});
				},
				onError: () => {
					toast({
						variant: "error",
						title: t("settings.account.changeName.notifications.error"),
					});
				},
				onResponse: () => {
					setSubmitting(false);
				},
			},
		);
	});

	return (
		<SettingsItem title={t("settings.account.changeName.title")}>
			<form onSubmit={onSubmit}>
				<Input type="text" {...form.register("phone")} />

				<div className="mt-4 flex justify-end">
					<Button
						type="submit"
						loading={submitting}
						disabled={
							!form.formState.isValid || !form.formState.dirtyFields.phone
						}
					>
						{t("settings.save")}
					</Button>
				</div>
			</form>
		</SettingsItem>
	);
}
