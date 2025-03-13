// apps/web/modules/admin/regions/page.tsx
"use client";

import { useRegionListQuery } from "@admin/regions/lib/api";
import { Button } from "@ui/components/button";
import Link from "next/link";

export default function RegionsListPage() {
	const { data: regions, isLoading, error } = useRegionListQuery();
	console.log(error);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading regions</div>;

	return (
		<main className="p-4">
			<h1 className="font-bold text-2xl">Regions</h1>
			<Link href="/admin/regions/new">
				<Button className="mt-4">Add New Region</Button>
			</Link>
			<ul className="mt-4">
				{regions.map((region: any) => (
					<li key={region.uuid} className="mb-2">
						<span>{region.region}</span>{" "}
						<Link href={`/admin/regions/${region.uuid}`}>
							<Button variant="outline" size="sm">
								Edit
							</Button>
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
