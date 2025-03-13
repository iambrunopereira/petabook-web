import { db } from "@repo/database";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";

// Define a Zod schema for creating/updating a region
const regionSchema = z.object({
	region: z.string(),
	centerLat: z.number(),
	centerLng: z.number(),
	type: z.enum(["city", "region"]),
	main: z.boolean().optional(), // defaults to false if not provided
	image: z.string(),
});

// Create a new Hono router with the base path "/regions"
export const regionsRouter = new Hono().basePath("/regions");

/**
 * GET /regions
 * List all regions
 */
regionsRouter.get(
	"/",
	describeRoute({
		summary: "List all regions",
		tags: ["Regions"],
	}),
	async (c) => {
		const regions = await db.region.findMany();
		return c.json(regions);
	},
);

/**
 * GET /regions/:uuid
 * Get a region by UUID
 */
regionsRouter.get(
	"/:uuid",
	describeRoute({
		summary: "Get a region by UUID",
		tags: ["Regions"],
	}),
	async (c) => {
		const { uuid } = c.req.param();
		const region = await db.region.findUnique({
			where: { uuid },
		});
		if (!region) {
			return c.json({ error: "Region not found" }, 404);
		}
		return c.json(region);
	},
);

/**
 * POST /regions
 * Create a new region (requires authentication)
 */
regionsRouter.post(
	"/",
	authMiddleware,
	// Use "json" instead of "body" for validating JSON payloads.
	validator("json", regionSchema),
	describeRoute({
		summary: "Create a new region",
		tags: ["Regions"],
	}),
	async (c) => {
		const payload = await c.req.valid("json");
		const newRegion = await db.region.create({
			data: {
				region: payload.region,
				centerLat: payload.centerLat,
				centerLng: payload.centerLng,
				type: payload.type,
				main: payload.main ?? false,
				image: payload.image,
			},
		});
		return c.json(newRegion, 201);
	},
);

/**
 * PUT /regions/:uuid
 * Update an existing region (requires authentication)
 */
regionsRouter.put(
	"/:uuid",
	authMiddleware,
	validator("json", regionSchema),
	describeRoute({
		summary: "Update an existing region",
		tags: ["Regions"],
	}),
	async (c) => {
		const payload = await c.req.valid("json");
		const { uuid } = c.req.param();
		try {
			const updatedRegion = await db.region.update({
				where: { uuid },
				data: {
					region: payload.region,
					centerLat: payload.centerLat,
					centerLng: payload.centerLng,
					type: payload.type,
					main: payload.main ?? false,
					image: payload.image,
				},
			});
			return c.json(updatedRegion);
		} catch (err) {
			return c.json({ error: "Region not found or update failed" }, 400);
		}
	},
);
