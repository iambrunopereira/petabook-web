import { db } from "@repo/database";
import { logger } from "@repo/logs";
import Stripe from "stripe";
import type {
	CancelSubscription,
	CreateCheckoutLink,
	CreateCustomerPortalLink,
	PauseSubscription,
	ResumeSubscription,
	UpdateSubscription,
	WebhookHandler,
} from "../../types";

let stripeClient: Stripe | null = null;

export function getStripeClient() {
	if (stripeClient) {
		return stripeClient;
	}

	const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;

	if (!stripeSecretKey) {
		throw new Error("Missing env variable STRIPE_SECRET_KEY");
	}

	stripeClient = new Stripe(stripeSecretKey);

	return stripeClient;
}

export const createCheckoutLink: CreateCheckoutLink = async (options) => {
	const stripeClient = getStripeClient();
	const {
		type,
		productId,
		redirectUrl,
		organizationId,
		userId,
		trialPeriodDays,
	} = options;

	const metadata = {
		organization_id: organizationId || null,
		user_id: userId || null,
	};

	const response = await stripeClient.checkout.sessions.create({
		mode: type === "subscription" ? "subscription" : "payment",
		success_url: redirectUrl ?? "",
		line_items: [
			{
				quantity: 1,
				price: productId,
			},
		],
		...(type === "one-time"
			? {
					payment_intent_data: {
						metadata,
					},
					customer_creation: "always",
				}
			: {
					subscription_data: {
						metadata,
						trial_period_days: trialPeriodDays,
					},
				}),
		metadata,
	});

	return response.url;
};

export const createCustomerPortalLink: CreateCustomerPortalLink = async ({
	customerId,
	redirectUrl,
}) => {
	const stripeClient = getStripeClient();

	const response = await stripeClient.billingPortal.sessions.create({
		customer: customerId,
		return_url: redirectUrl ?? "",
	});

	return response.url;
};

export const pauseSubscription: PauseSubscription = async ({ id }) => {
	const stripeClient = getStripeClient();

	await stripeClient.subscriptions.update(id, {
		pause_collection: {
			behavior: "void",
		},
	});
};

export const updateSubscription: UpdateSubscription = async ({
	id,
	productId,
}) => {
	const stripeClient = getStripeClient();

	const subscription = await stripeClient.subscriptions.retrieve(id);

	if (!subscription) {
		throw new Error("Subscription not found.");
	}

	const response = await stripeClient.subscriptions.update(id, {
		items: [
			{
				id: subscription.items.data[0].id,
				price: productId,
			},
		],
	});

	return {
		status: response.status,
	};
};

export const cancelSubscription: CancelSubscription = async ({ id }) => {
	const stripeClient = getStripeClient();

	await stripeClient.subscriptions.cancel(id);
};

export const resumeSubscription: ResumeSubscription = async ({ id }) => {
	const stripeClient = getStripeClient();

	const response = await stripeClient.subscriptions.resume(id, {
		billing_cycle_anchor: "unchanged",
	});

	return {
		status: response.status,
	};
};

export const webhookHandler: WebhookHandler = async (req) => {
	const stripeClient = getStripeClient();

	if (!req.body) {
		return new Response("Invalid request.", {
			status: 400,
		});
	}

	let event: Stripe.Event | undefined;

	try {
		event = await stripeClient.webhooks.constructEventAsync(
			await req.text(),
			req.headers.get("stripe-signature") as string,
			process.env.STRIPE_WEBHOOK_SECRET as string,
		);
	} catch (e) {
		logger.error(e);

		return new Response("Invalid request.", {
			status: 400,
		});
	}

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const checkoutSessionId = event.data.object.id;
				const { mode, metadata, customer } = event.data.object;

				const checkoutSession = await stripeClient.checkout.sessions.retrieve(
					checkoutSessionId,
					{
						expand: ["line_items"],
					},
				);

				const productId = checkoutSession.line_items?.data[0].price?.id;

				if (!productId) {
					return new Response("Missing product ID.", {
						status: 400,
					});
				}

				if (mode === "subscription") {
					const subscriptionId = event.data.object.subscription as string;
					await db.purchase.create({
						data: {
							subscriptionId,
							organizationId: metadata?.organization_id || null,
							userId: metadata?.user_id || null,
							customerId: customer as string,
							type: "SUBSCRIPTION",
							productId,
						},
					});
				} else if (mode === "payment") {
					await db.purchase.create({
						data: {
							organizationId: metadata?.organization_id || null,
							userId: metadata?.user_id || null,
							customerId: customer as string,
							type: "ONE_TIME",
							productId,
						},
					});
				}

				break;
			}
			case "customer.subscription.updated": {
				const subscriptionId = event.data.object.id;

				const existingPurchase = await db.purchase.findUnique({
					where: {
						subscriptionId,
					},
				});

				if (existingPurchase) {
					await db.purchase.update({
						data: {
							status: event.data.object.status,
							productId: event.data.object.items?.data[0].price?.id,
						},
						where: {
							subscriptionId,
						},
					});
				}
				break;
			}
			case "customer.subscription.deleted": {
				await db.purchase.delete({
					where: {
						subscriptionId: event.data.object.id,
					},
				});
				break;
			}

			default:
				return new Response("Unhandled event type.", {
					status: 200,
				});
		}

		return new Response(null, { status: 204 });
	} catch (error) {
		return new Response(
			`Webhook error: ${error instanceof Error ? error.message : ""}`,
			{
				status: 400,
			},
		);
	}
};
