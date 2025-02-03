import { db } from "@repo/database";

export async function getOrganizationMembership(
	userId: string,
	organizationId: string,
) {
	const membership = await db.member.findUnique({
		where: {
			userId_organizationId: {
				userId,
				organizationId,
			},
		},
	});

	return membership;
}
