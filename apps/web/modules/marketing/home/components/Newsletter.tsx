"use client";
//@ts-nocheck
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewsletterSignupMutation } from "@marketing/home/lib/api";
import {} from "@ui/components/alert";
import {} from "lucide-react";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
	email: z.string().email(),
});
type FormValues = z.infer<typeof formSchema>;

export function Newsletter() {
	const t = useTranslations();
	const newsletterSignupMutation = useNewsletterSignupMutation();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = form.handleSubmit(async ({ email }) => {
		try {
			await newsletterSignupMutation.mutateAsync({ email });
		} catch {
			form.setError("email", {
				message: t("newsletter.hints.error.message"),
			});
		}
	});

	return (
		<section className="py-16">
			<div className="container">
				{/* <div className="mb-8 text-center">
					<MailboxIcon className="mx-auto mb-3 size-8 text-primary" />
					<h1 className="font-bold text-3xl lg:text-4xl">
						{t("newsletter.title")}
					</h1>
					<p className="mt-3 text-lg opacity-70">{t("newsletter.subtitle")}</p>
				</div>

				<div className="mx-auto max-w-lg">
					{form.formState.isSubmitSuccessful ? (
						<Alert variant="success">
							<CheckCircleIcon className="size-6" />
							<AlertTitle>{t("newsletter.hints.success.title")}</AlertTitle>
							<AlertDescription>
								{t("newsletter.hints.success.message")}
							</AlertDescription>
						</Alert>
					) : (
						<form onSubmit={onSubmit}>
							<div className="flex items-start">
								<Input
									type="email"
									required
									placeholder={t("newsletter.email")}
									{...form.register("email")}
								/>

								<Button
									type="submit"
									className="ml-4"
									loading={form.formState.isSubmitting}
								>
									{t("newsletter.submit")}
								</Button>
							</div>
							{form.formState.errors.email && (
								<p className="mt-1 text-destructive text-xs">
									{form.formState.errors.email.message}
								</p>
							)}
						</form>
					)}
				</div> */}
				<iframe
					src="https://embeds.beehiiv.com/101ff242-e655-4fd5-a36a-2db36c03ecbd"
					data-test-id="beehiiv-embed"
					width="100%"
					height="320"
					frameBorder="0"
					scrolling="no"
					style={{
						borderRadius: "4px",
						border: "2px solid #e5e7eb",
						margin: 0,
						backgroundColor: "transparent",
					}}
				></iframe>
			</div>
		</section>
	);
}
