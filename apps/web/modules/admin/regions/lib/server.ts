// apps/web/modules/admin/regions/lib/server.ts
import { db } from "@repo/database";

export const getRegionByUuid = async (uuid: string) => {
	return await db.region.findUnique({
		where: { uuid },
	});
};
