/* "use client";

import { useRegionListQuery } from "@admin/regions/lib/api";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { getAdminPath } from "@saas/admin/lib/links";
import { OrganizationLogo } from "@saas/organizations/components/OrganizationLogo";
import { useConfirmationAlert } from "@saas/shared/components/ConfirmationAlertProvider";
import { Pagination } from "@saas/shared/components/Pagination";
import { Spinner } from "@shared/components/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Button } from "@ui/components/button";
import { Card } from "@ui/components/card";
import { Input } from "@ui/components/input";
import { Table, TableBody, TableCell, TableRow } from "@ui/components/table";
import { useToast } from "@ui/hooks/use-toast";
import {
	EditIcon,
	Link,
	MoreVerticalIcon,
	PlusIcon,
	TrashIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";
import { withQuery } from "ufo";
import { useDebounceValue } from "usehooks-ts";

const ITEMS_PER_PAGE = 10;

export default function RegionsListPage() {
	const t = useTranslations();
	const { toast } = useToast();
	const { data, isLoading, error } = useRegionListQuery();
	const { confirm } = useConfirmationAlert();

	console.log(error);

	const queryClient = useQueryClient();
	const [currentPage, setCurrentPage] = useQueryState(
		"currentPage",
		parseAsInteger.withDefault(1),
	);
	const [searchTerm, setSearchTerm] = useQueryState(
		"query",
		parseAsString.withDefault(""),
	);
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useDebounceValue(
		searchTerm,
		300,
		{
			leading: true,
			trailing: false,
		},
	);

	const getPathWithBackToParemeter = (path: string) => {
		const searchParams = new URLSearchParams(window.location.search);
		return withQuery(path, {
			backTo: `${window.location.pathname}${searchParams.size ? `?${searchParams.toString()}` : ""}`,
		});
	};

	const getOrganizationEditPath = (id: string) => {
		return getPathWithBackToParemeter(getAdminPath(`/organizations/${id}`));
	};

	useEffect(() => {
		setDebouncedSearchTerm(searchTerm);
	}, [searchTerm]);
	/* 	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading regions</div>; */

/* return (
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
	const columns: ColumnDef<NonNullable<typeof data>["regions"][number]>[] =
		useMemo(
			() => [
				{
					accessorKey: "regions",
					header: "",
					accessorFn: (row) => row.region,
					cell: ({
						row: {
							original: { uuid, region, image },
						},
					}) => (
						<div className="flex items-center gap-2">
							<OrganizationLogo name={region} logoUrl={image} />
							<div className="leading-tight">
								<Link
									href={getOrganizationEditPath(uuid)}
									className="block font-bold"
								>
									{region}
								</Link>
								<small>
									{t("admin.organizations.membersCount", {
										count: 0,
									})}
								</small>
							</div>
						</div>
					),
				},
				{
					accessorKey: "actions",
					header: "",
					cell: ({
						row: {
							original: { uuid },
						},
					}) => {
						return (
							<div className="flex flex-row justify-end gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button size="icon" variant="ghost">
											<MoreVerticalIcon className="size-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem asChild>
											<Link href={""} className="flex items-center">
												<EditIcon className="mr-2 size-4" />
												{t("admin.organizations.edit")}
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() =>
												confirm({
													title: t("admin.organizations.confirmDelete.title"),
													message: t(
														"admin.organizations.confirmDelete.message",
													),
													confirmLabel: t(
														"admin.organizations.confirmDelete.confirm",
													),
													destructive: true,
													onConfirm: () =>

												})
											}
										>
											<span className="flex items-center text-destructive hover:text-destructive">
												<TrashIcon className="mr-2 size-4" />
												{t("admin.organizations.delete")}
											</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						);
					},
				},
			],
			[],
		);
	const regions = useMemo(() => data?.regions ?? [], [data?.regions]);
	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearchTerm]);

	const table = useReactTable({
		data: regions,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
	});
	return (
		<Card className="p-6">
			<h2 className="mb-4 font-semibold text-2xl">
				{t("admin.regions.title")}
			</h2>
			<Input
				type="search"
				placeholder={t("admin.regions.search")}
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="mb-4"
			/>
			<Button asChild>
				<Link href={getAdminPath("/regions/new")}>
					<PlusIcon className="mr-1.5 size-4" />
					{t("admin.organizations.create")}
				</Link>
			</Button>
			<div className="rounded-md border">
				<Table>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
									className="group"
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className="py-2 group-first:rounded-t-md group-last:rounded-b-md"
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									{isLoading ? (
										<div className="flex h-full items-center justify-center">
											<Spinner className="mr-2 size-4 text-primary" />
											{t("admin.regions.loading")}
										</div>
									) : (
										<p>No results.</p>
									)}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			{data?.total && data.total > ITEMS_PER_PAGE && (
				<Pagination
					className="mt-4"
					totalItems={data.total}
					itemsPerPage={ITEMS_PER_PAGE}
					currentPage={currentPage}
					onChangeCurrentPage={setCurrentPage}
				/>
			)}
		</Card>
	);
}
 */
