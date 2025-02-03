import { db } from "@repo/database";
import slugify from "@sindresorhus/slugify";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";
import { nanoid } from "nanoid";
import { z } from "zod";
import { authMiddleware } from "../middleware/auth";

export const organizationsRouter = new Hono()
	.basePath("/organizations")
	.get(
		"/generate-slug",
		validator(
			"query",
			z.object({
				name: z.string(),
			}),
		),
		describeRoute({
			summary: "Generate a slug for an organization",
			tags: ["Organizations"],
		}),
		async (c) => {
			const { name } = c.req.valid("query");

			const baseSlug = slugify(name, {
				lowercase: true,
			});

			let slug = baseSlug;
			let hasAvailableSlug = false;

			for (let i = 0; i < 3; i++) {
				const existing = await db.organization.findUnique({
					where: {
						slug,
					},
				});

				if (!existing) {
					hasAvailableSlug = true;
					break;
				}

				slug = `${baseSlug}-${nanoid(5)}`;
			}

			if (!hasAvailableSlug) {
				return c.json(
					{
						error: "No available slug found",
					},
					400,
				);
			}

			return c.json({
				slug,
			});
		},
	)
	.get(
		"/organization-by-slug",
		authMiddleware,
		validator("query", z.object({ slug: z.string() })),
		describeRoute({
			summary: "Get an organization by slug",
			tags: ["Organizations"],
		}),
		async (c) => {
			const { slug } = c.req.valid("query");

			const organization = await db.organization.findUnique({
				where: { slug },
				include: {
					members: {
						include: {
							user: true,
						},
					},
					invitations: {
						include: {
							user: true,
						},
					},
				},
			});

			if (!organization) {
				throw new HTTPException(404, {
					message: "Organization not found",
				});
			}

			if (
				!organization.members.some(
					(member) => member.userId === c.get("user").id,
				)
			) {
				throw new HTTPException(403, {
					message: "You are not a member of this organization",
				});
			}

			return c.json(organization);
		},
	);
