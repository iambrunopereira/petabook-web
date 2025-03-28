"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContactFormMutation } from "@marketing/home/lib/api";
import {
	type ContactFormValues,
	contactFormSchema,
} from "@repo/api/src/routes/contact/types";
import {} from "@ui/components/alert";
import { Button } from "@ui/components/button";
import {} from "@ui/components/form";
import {} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function ContactForm() {
	const t = useTranslations();
	const contactFormMutation = useContactFormMutation();

	const form = useForm<ContactFormValues>({
		resolver: zodResolver(contactFormSchema),
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
	});

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			await contactFormMutation.mutateAsync(values);
		} catch {
			form.setError("root", {
				message: t("contact.form.notifications.error"),
			});
		}
	});

	return (
		<div>
			{/* {form.formState.isSubmitSuccessful ? (
        <Alert variant="success">
          <MailCheckIcon className="size-6" />
          <AlertTitle>
            {t('contact.form.notifications.success')}
          </AlertTitle>
        </Alert>
      ) : (
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-stretch gap-4"
          >
            {form.formState.errors.root?.message && (
              <Alert variant="error">
                <MailIcon className="size-6" />
                <AlertTitle>
                  {form.formState.errors.root.message}
                </AlertTitle>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.form.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.form.email')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('contact.form.message')}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              loading={form.formState.isSubmitting}
            >
              {t('contact.form.submit')}
            </Button>
          </form>
        </Form>
      )} */}
			<Button
				key="partner-button"
				className="hidden md:flex"
				asChild
				variant="secondary"
			>
				<Link
					key={"partner-button"}
					href={
						"https://docs.google.com/forms/d/e/1FAIpQLSePjLZ5a_J2W_lwqo9g95Ek78Y9fasCcqk6fu7oT4qBZee87w/viewform?usp=header"
					}
					target="_blank"
					className="block px-3 py-2 text-base"
				>
					Entrar em contacto
				</Link>
			</Button>
		</div>
	);
}
