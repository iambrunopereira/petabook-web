import { getOrganizationMembership } from "@repo/auth";
import { db } from "@repo/database";
import { logger } from "@repo/logs";
import {
	cancelSubscription,
	pauseSubscription,
	resumeSubscription,
	updateSubscription,
} from "@repo/payments";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { authMiddleware } from "../../middleware/auth";

export const subscriptionRouter = new Hono()
	.basePath("/subscription")
	.post(
		"/cancel",
		authMiddleware,
		validator("query", z.object({ purchaseId: z.string() })),
		describeRoute({
			tags: ["Payments"],
			summary: "Cancel a subscription",
			description: "Cancels a subscription for a purchase",
			responses: {
				204: {
					description: "Subscription cancelled",
				},
			},
		}),
		async (c) => {
			const { purchaseId } = c.req.valid("query");
			const user = c.get("user");

			const purchase = await db.purchase.findUnique({
				where: {
					id: purchaseId,
				},
			});

			if (!purchase) {
				throw new HTTPException(400);
			}

			if (purchase.organizationId) {
				const userOrganizationMembership = await getOrganizationMembership(
					user.id,
					purchase.organizationId,
				);
				if (
					userOrganizationMembership &&
					!["owner", "admin"].includes(userOrganizationMembership.role)
				) {
					throw new HTTPException(403);
				}
			}

			if (purchase.userId && purchase.userId !== user.id) {
				throw new HTTPException(403);
			}

			if (!purchase.subscriptionId) {
				throw new HTTPException(400);
			}

			try {
				await cancelSubscription({ id: purchase.subscriptionId });

				await db.purchase.update({
					where: {
						id: purchaseId,
					},
					data: {
						status: "cancelled",
					},
				});
			} catch (e) {
				logger.error(e);
				throw new HTTPException(500);
			}
		},
	)
	.post(
		"/pause",
		authMiddleware,
		validator("query", z.object({ purchaseId: z.string() })),
		describeRoute({
			tags: ["Payments"],
			summary: "Pause a subscription",
			description: "Pauses a subscription for a purchase",
			responses: {
				204: {
					description: "Subscription paused",
				},
			},
		}),
		async (c) => {
			const { purchaseId } = c.req.valid("query");
			const user = c.get("user");

			const purchase = await db.purchase.findUnique({
				where: {
					id: purchaseId,
				},
			});

			if (!purchase) {
				throw new HTTPException(400);
			}

			if (purchase.organizationId) {
				const userOrganizationMembership = await getOrganizationMembership(
					user.id,
					purchase.organizationId,
				);
				if (userOrganizationMembership?.role !== "owner") {
					throw new HTTPException(403);
				}
			}

			if (purchase.userId && purchase.userId !== user.id) {
				throw new HTTPException(403);
			}

			if (!purchase.subscriptionId) {
				throw new HTTPException(400);
			}

			try {
				await pauseSubscription({ id: purchase.subscriptionId });

				await db.purchase.update({
					where: {
						id: purchaseId,
					},
					data: {
						status: "paused",
					},
				});
			} catch (e) {
				logger.error(e);
				throw new HTTPException(500);
			}
		},
	)
	.post(
		"/resume",
		authMiddleware,
		validator("query", z.object({ purchaseId: z.string() })),
		describeRoute({
			tags: ["Payments"],
			summary: "Resume a subscription",
			description: "Resumes a paused subscription for a purchase",
			responses: {
				204: {
					description: "Subscription resumed",
				},
			},
		}),
		async (c) => {
			const { purchaseId } = c.req.valid("query");
			const user = c.get("user");

			const purchase = await db.purchase.findUnique({
				where: {
					id: purchaseId,
				},
			});

			if (!purchase) {
				throw new HTTPException(400);
			}

			if (purchase.organizationId) {
				const userOrganizationMembership = await getOrganizationMembership(
					user.id,
					purchase.organizationId,
				);
				if (userOrganizationMembership?.role !== "owner") {
					throw new HTTPException(403);
				}
			}

			if (purchase.userId && purchase.userId !== user.id) {
				throw new HTTPException(403);
			}

			if (!purchase.subscriptionId) {
				throw new HTTPException(400);
			}

			try {
				const { status } = await resumeSubscription({
					id: purchase.subscriptionId,
				});

				await db.purchase.update({
					where: {
						id: purchaseId,
					},
					data: {
						status,
					},
				});
			} catch (e) {
				logger.error(e);
				throw new HTTPException(500);
			}
		},
	)
	.post(
		"/update",
		authMiddleware,
		validator(
			"query",
			z.object({ purchaseId: z.string(), productId: z.string() }),
		),
		describeRoute({
			tags: ["Payments"],
			summary: "Update a subscription",
			description: "Updates a subscription for a purchase",
			responses: {
				204: {
					description: "Subscription updated",
				},
			},
		}),
		async (c) => {
			const { purchaseId, productId } = c.req.valid("query");
			const user = c.get("user");
			const purchase = await db.purchase.findUnique({
				where: {
					id: purchaseId,
				},
			});

			if (!purchase) {
				throw new HTTPException(400);
			}

			if (purchase.organizationId) {
				const userOrganizationMembership = await getOrganizationMembership(
					user.id,
					purchase.organizationId,
				);
				if (userOrganizationMembership?.role !== "owner") {
					throw new HTTPException(403);
				}
			}

			if (purchase.userId && purchase.userId !== user.id) {
				throw new HTTPException(403);
			}

			if (!purchase.subscriptionId) {
				throw new HTTPException(400);
			}

			try {
				const { status } = await updateSubscription({
					id: purchase.subscriptionId,
					productId,
				});

				await db.purchase.update({
					where: {
						id: purchaseId,
					},
					data: {
						status,
					},
				});
			} catch (e) {
				logger.error(e);

				throw new HTTPException(500);
			}
		},
	);
