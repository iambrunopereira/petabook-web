// apps/web/modules/admin/regions/components/CreateRegionForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@shared/hooks/router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/components/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@ui/components/form";
import { Input } from "@ui/components/input";
import { useToast } from "@ui/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { regionListQueryKey, useCreateRegionMutation } from "../lib/api";

const formSchema = z.object({
	region: z.string().min(3).max(32),
	centerLat: z.number(),
	centerLng: z.number(),
	type: z.enum(["city", "region"]),
	main: z.boolean().optional(),
	image: z.string().url(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateRegionForm() {
	const { toast } = useToast();
	const router = useRouter();
	const queryClient = useQueryClient();
	const createRegionMutation = useCreateRegionMutation();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			region: "",
			centerLat: 0,
			centerLng: 0,
			type: "city",
			main: false,
			image: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		try {
			const newRegion = await createRegionMutation.mutateAsync(data);
			await queryClient.invalidateQueries({ queryKey: regionListQueryKey });
			router.push(`/admin/regions/${newRegion.uuid}`);
			toast({
				variant: "success",
				title: "Region created successfully",
			});
		} catch (e) {
			toast({
				variant: "error",
				title: "Failed to create region",
			});
		}
	});

	return (
		<div className="mx-auto w-full max-w-md">
			<h1 className="font-extrabold text-2xl">Create New Region</h1>
			<Form {...form}>
				<form onSubmit={onSubmit}>
					<FormField
						control={form.control}
						name="region"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Region Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="centerLat"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Center Latitude</FormLabel>
								<FormControl>
									<Input {...field} type="number" step="any" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="centerLng"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Center Longitude</FormLabel>
								<FormControl>
									<Input {...field} type="number" step="any" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Type</FormLabel>
								<FormControl>
									<select {...field} className="rounded border p-2">
										<option value="city">City</option>
										<option value="region">Region</option>
									</select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="main"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Main</FormLabel>
								<FormControl>
									<input type="checkbox" {...field} checked={field.value} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="image"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image URL</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className="mt-6 w-full"
						type="submit"
						loading={form.formState.isSubmitting}
					>
						Create Region
					</Button>
				</form>
			</Form>
		</div>
	);
}
