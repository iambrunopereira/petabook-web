import { getActiveOrganization, getSession } from "@saas/auth/lib/server";
import { InviteMemberForm } from "@saas/organizations/components/InviteMemberForm";
import { OrganizationMembersBlock } from "@saas/organizations/components/OrganizationMembersBlock";
import { SettingsList } from "@saas/shared/components/SettingsList";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
export async function generateMetadata() {
	const t = await getTranslations();

	return {
		title: t("organizations.settings.title"),
	};
}

export default async function OrganizationSettingsPage({
	params,
}: {
	params: Promise<{ organizationSlug: string }>;
}) {
	const session = await getSession();
	const { organizationSlug } = await params;
	const organization = await getActiveOrganization(organizationSlug);

	if (!organization) {
		return notFound();
	}

	const userRole = session?.user?.role;
	const userOrganizationRole = organization.members.find(
		(member) => member.userId === session?.session.userId,
	)?.role;
	const userIsOrganizationAdmin =
		userRole === "admin" ||
		(userOrganizationRole && ["admin", "owner"].includes(userOrganizationRole));

	return (
		<SettingsList>
			{userIsOrganizationAdmin && (
				<InviteMemberForm organizationId={organization.id} />
			)}
			<OrganizationMembersBlock organizationId={organization.id} />
		</SettingsList>
	);
}
