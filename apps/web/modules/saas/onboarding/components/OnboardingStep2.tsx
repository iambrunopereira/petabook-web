"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserAvatarUpload } from "@saas/settings/components/UserAvatarUpload";
import { Toggle } from "@saas/shared/components/Toggle";
import { Button } from "@ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { useTranslations } from "next-intl";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const dogSchema = z.object({
	name: z.string().nonempty(),
	breed: z.string().optional(),
	age: z.number().optional(),
	gender: z.string().optional(),
	color: z.string().optional(),
	weight: z.number().optional(),
	size: z.enum(["small", "medium", "big"]),
	neutered: z.boolean(),
	healthy: z.boolean(),
	vaccinated: z.boolean(),
	dewormed: z.boolean(),
	microchip: z.boolean(),
	allergies: z.string().optional(),
	sociable: z.boolean(),
	eatingHabits: z.string().optional(),
	image: z.string().optional(),
});

const formSchema = z.object({
	dogs: z.array(dogSchema),
});

type FormValues = z.infer<typeof formSchema>;

export function OnboardingStep2({ onCompleted }: { onCompleted: () => void }) {
	const t = useTranslations();
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			dogs: [
				{
					name: "",
					breed: "",
					age: undefined,
					gender: "",
					color: "",
					weight: undefined,
					size: "small",
					neutered: false,
					healthy: false,
					vaccinated: false,
					dewormed: false,
					microchip: false,
					allergies: "",
					sociable: false,
					eatingHabits: "",
					image: "",
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "dogs",
	});
	console.log("fields", fields);
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			// Save the dogs' data (e.g., send it to the server)
			console.log("tt", data);

			onCompleted();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div>
			<Form {...form}>
				<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
					{fields.map((field, index) => (
						<div key={field.id} className="space-y-4 border-b pb-4">
							<div className="flex items-center justify-between">
								<h3 className="font-bold text-lg">
									{t("onboarding.dog.title", { index: index + 1 })}
								</h3>
								<Button
									variant="primary"
									onClick={() => remove(index)}
									className="mt-4"
								>
									{t("onboarding.dog.remove")}
								</Button>
							</div>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name={`dogs.${index}.name`}
									render={({ field }) => (
										<FormItem className="md:col-span-2">
											<FormLabel>{t("onboarding.dog.name")}</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`dogs.${index}.breed`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("onboarding.dog.breed")}</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`dogs.${index}.age`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("onboarding.dog.age")}</FormLabel>
											<FormControl>
												<Input type="number" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`dogs.${index}.gender`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("onboarding.dog.gender")}</FormLabel>
											<FormControl>
												<select
													{...field}
													className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
												>
													<option value="boy">
														{t("onboarding.dog.genderBoy")}
													</option>
													<option value="girl">
														{t("onboarding.dog.genderGirl")}
													</option>
												</select>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`dogs.${index}.color`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("onboarding.dog.color")}</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`dogs.${index}.weight`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("onboarding.dog.weight")}</FormLabel>
											<FormControl>
												<Input type="number" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`dogs.${index}.size`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{t("onboarding.dog.size")}</FormLabel>
											<FormControl>
												<select
													{...field}
													className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
												>
													<option value="small">
														{t("onboarding.dog.sizeSmall")}
													</option>
													<option value="medium">
														{t("onboarding.dog.sizeMedium")}
													</option>
													<option value="big">
														{t("onboarding.dog.sizeBig")}
													</option>
												</select>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`dogs.${index}.neutered`}
									render={({ field }) => (
										<FormItem className="flex items-center justify-between md:col-span-2">
											<FormLabel className="font-medium text-gray-700 text-sm">
												{t("onboarding.dog.neutered")}
											</FormLabel>
											<FormControl>
												<Toggle
													checked={field.value}
													onBlur={field.onBlur}
													name={field.name}
													ref={field.ref}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`dogs.${index}.sociable`}
									render={({ field }) => (
										<FormItem className="flex items-center justify-between md:col-span-2">
											<FormLabel className="font-medium text-gray-700 text-sm">
												{t("onboarding.dog.sociable")}
											</FormLabel>
											<FormControl>
												<Toggle
													checked={field.value}
													onBlur={field.onBlur}
													name={field.name}
													ref={field.ref}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`dogs.${index}.image`}
									render={({ field }) => (
										<FormItem className="md:col-span-2">
											<FormLabel>{t("onboarding.dog.image")}</FormLabel>
											<FormControl>
												<UserAvatarUpload
													onSuccess={(base64Image) => {
														field.onChange(base64Image); // Set Base64 string to the form field
													}}
													onError={() => {
														console.error("Failed to process the image.");
													}}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>
					))}
					<div className="flex items-center justify-between md:col-span-2">
						<Button
							type="button"
							variant="secondary"
							onClick={() =>
								append({
									name: "",
									breed: "",
									age: undefined,
									gender: "",
									color: "",
									weight: undefined,
									size: "small",
									neutered: false,
									healthy: false,
									vaccinated: false,
									dewormed: false,
									microchip: false,
									allergies: "",
									sociable: false,
									eatingHabits: "",
									image: "",
								})
							}
						>
							{t("onboarding.dog.add")}
						</Button>
						<Button variant="primary" type="submit">
							{t("onboarding.continue")}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
