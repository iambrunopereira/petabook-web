export type CreateCheckoutLink = (params: {
	type: "subscription" | "one-time";
	productId: string;
	email?: string;
	name?: string;
	redirectUrl?: string;
	organizationId?: string;
	userId?: string;
	trialPeriodDays?: number;
}) => Promise<string | null>;

export type CreateCustomerPortalLink = (params: {
	subscriptionId?: string;
	customerId: string;
	redirectUrl?: string;
}) => Promise<string | null>;

export type PauseSubscription = (params: { id: string }) => Promise<void>;

export type UpdateSubscription = (params: {
	id: string;
	productId: string;
}) => Promise<{
	status: string;
}>;

export type CancelSubscription = (params: { id: string }) => Promise<void>;

export type ResumeSubscription = (params: { id: string }) => Promise<{
	status: string;
}>;

export type WebhookHandler = (req: Request) => Promise<Response>;

export type PaymentProvider = {
	createCheckoutLink: CreateCheckoutLink;
	createCustomerPortalLink: CreateCustomerPortalLink;
	pauseSubscription: PauseSubscription;
	cancelSubscription: CancelSubscription;
	resumeSubscription: ResumeSubscription;
	webhookHandler: WebhookHandler;
};
