// apps/web/modules/admin/regions/lib/api.ts
import { apiClient } from "@shared/lib/api-client"; // your shared API client
import { useMutation, useQuery } from "@tanstack/react-query";

export const regionListQueryKey = ["admin", "regions"] as const;

export const useRegionListQuery = () => {
	return useQuery({
		queryKey: regionListQueryKey,
		queryFn: async () => {
			const res = await apiClient.regions.$get();

			console.log("test", res);
			if (!res.ok) {
				const errorText = await res.text();
				console.error("Error fetching regions:", res.status, errorText);
				throw new Error("Failed to fetch regions");
			}
			return res.json();
		},
	});
};

export const createRegionMutationKey = ["create-region"] as const;
export const useCreateRegionMutation = () => {
	return useMutation({
		mutationKey: createRegionMutationKey,
		mutationFn: async (data: {
			region: string;
			centerLat: number;
			centerLng: number;
			type: "city" | "region";
			main?: boolean;
			image: string;
		}) => {
			const res = await apiClient.regions.post({
				body: data,
			});
			if (!res.ok) {
				throw new Error("Failed to create region");
			}
			return res.json();
		},
	});
};

export const updateRegionMutationKey = ["update-region"] as const;
export const useUpdateRegionMutation = () => {
	return useMutation({
		mutationKey: updateRegionMutationKey,
		mutationFn: async (data: {
			uuid: string;
			region: string;
			centerLat: number;
			centerLng: number;
			type: "city" | "region";
			main?: boolean;
			image: string;
		}) => {
			const res = await apiClient.regions.put({
				body: data,
			});
			if (!res.ok) {
				throw new Error("Failed to update region");
			}
			return res.json();
		},
	});
};
