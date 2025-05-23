"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@repo/auth/client";
import { useSession } from "@saas/auth/hooks/use-session";
import { UserAvatarUpload } from "@saas/settings/components/UserAvatarUpload";
import { Button } from "@ui/components/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	name: z.string(),
	address: z.string().optional(),
	country: z.string().optional(),
	phone: z.string().optional(),
	postalCode: z.string().optional(),
	city: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function OnboardingStep1({ onCompleted }: { onCompleted: () => void }) {
	const t = useTranslations();
	const { user } = useSession();
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user?.name ?? "",
			address: user?.address ?? "",
			country: user?.country ?? "",
			phone: user?.phone ?? "",
			postalCode: user?.postalCode ?? "",
			city: user?.city ?? "",
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		form.clearErrors("root");

		try {
			console.log("data", data);
			await authClient.updateUser(data);

			onCompleted();
		} catch (e) {
			form.setError("root", {
				type: "server",
				message: t("onboarding.notifications.accountSetupFailed"),
			});
		}
	};

	return (
		<div>
			<Form {...form}>
				<form
					className="grid grid-cols-1 gap-8 md:grid-cols-2"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("onboarding.account.name")}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("onboarding.account.phone")}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("onboarding.account.address")}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="postalCode"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("onboarding.account.postalCode")}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="city"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("onboarding.account.city")}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="country"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t("onboarding.account.country")}</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="md:col-span-2">
						<FormItem className="flex items-center justify-between gap-4">
							<div>
								<FormLabel>{t("onboarding.account.avatar")}</FormLabel>
								<FormDescription>
									{t("onboarding.account.avatarDescription")}
								</FormDescription>
							</div>
							<FormControl>
								<UserAvatarUpload
									onSuccess={(base64Image) => {
										console.log("Base64 Image:", base64Image);
										// Save the Base64 image to your form or state
									}}
									onError={() => {
										console.error("Failed to process the image.");
									}}
								/>
							</FormControl>
						</FormItem>
					</div>
					<div className="flex items-center justify-end md:col-span-2">
						<Button
							variant="primary"
							type="submit"
							loading={form.formState.isSubmitting}
						>
							{t("onboarding.continue")}
							<ArrowRightIcon className="ml-2 size-4" />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
