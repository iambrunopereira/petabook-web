import type { Config } from "./types";

export const config = {
	// Internationalization
	i18n: {
		// Whether internationalization should be enabled (if disabled, you still need to define the locale you want to use below and set it as the default locale)
		enabled: true,
		// Define all locales here that should be available in the app
		// You need to define a label that is shown in the language selector and a currency that should be used for pricing with this locale
		locales: {
			/* en: {
				currency: "EUR",
				label: "English",
			}, */
			pt: {
				currency: "EUR",
				label: "Portugues",
			},
		},
		// The default locale is used if no locale is provided
		defaultLocale: "pt",
		// The default currency is used for pricing if no currency is provided
		defaultCurrency: "EUR",
		// The name of the cookie that is used to determine the locale
		localeCookieName: "NEXT_LOCALE",
	},
	// Organizations
	organizations: {
		// Whether organizations are enabled in general
		enable: false,
		// Whether billing for organizations should be enabled (below you can enable it for users instead)
		enableBilling: false,
		// Whether the organization should be hidden from the user (use this for multi-tenant applications)
		hideOrganization: false,
		// Should users be able to create new organizations? Otherwise only admin users can create them
		enableUsersToCreateOrganizations: false,
		// Whether users should be required to be in an organization. This will redirect users to the organization page after sign in
		requireOrganization: false,
		// Define forbidden organization slugs. Make sure to add all paths that you define as a route after /app/... to avoid routing issues
		forbiddenOrganizationSlugs: [
			"new-organization",
			"admin",
			"settings",
			"ai-demo",
		],
	},
	// Users
	users: {
		// Whether billing should be enabled for users (above you can enable it for organizations instead)
		enableBilling: false,
		// Whether you want the user to go through an onboarding form after signup (can be defined in the OnboardingForm.tsx)
		enableOnboarding: false,
	},
	// Authentication
	auth: {
		// Whether users should be able to create accounts (otherwise users can only be by admins)
		enableSignup: false,
		// Whether users should be able to sign in with a magic link
		enableMagicLink: false,
		// Whether users should be able to sign in with a social provider
		enableSocialLogin: false,
		// Whether users should be able to sign in with a passkey
		enablePasskeys: false,
		// Whether users should be able to sign in with a password
		enablePasswordLogin: true,
		// where users should be redirected after the sign in
		redirectAfterSignIn: "/app",
		// where users should be redirected after logout
		redirectAfterLogout: "/",
		// how long a session should be valid
		sessionCookieMaxAge: 60 * 60 * 24 * 30,
	},
	// Mails
	mails: {
		// the from address for mails
		from: "geral@petabook.com",
	},
	// Frontend
	ui: {
		// the themes that should be available in the app
		enabledThemes: ["light", "dark"],
		// the default theme
		defaultTheme: "light",
		// the saas part of the application
		saas: {
			// whether the saas part should be enabled (otherwise all routes will be redirect to the marketing page)
			enabled: false,
			// whether the sidebar layout should be used
			useSidebarLayout: true,
		},
		// the marketing part of the application
		marketing: {
			// whether the marketing features should be enabled (otherwise all routes will be redirect to the saas part)
			enabled: true,
		},
	},
	// Storage
	storage: {
		// define the name of the buckets for the different types of files
		bucketNames: {
			avatars: process.env.NEXT_PUBLIC_AVATARS_BUCKET_NAME ?? "avatars",
		},
	},
	contactForm: {
		// whether the contact form should be enabled
		enabled: true,
		// the email to which the contact form messages should be sent
		to: "geral@petabook.com",
		// the subject of the email
		subject: "Contact form message",
	},
	// Payments
	payments: {
		// define the products that should be available in the checkout
		plans: {
			// The free plan is treated differently. It will automatically be assigned if the user has no other plan.
			free: {
				isFree: true,
			},
			pro: {
				recommended: true,
				prices: [
					{
						type: "recurring",
						productId: "price_1M9kHDFkmmuOs718blksnsHJ",
						interval: "month",
						amount: 29,
						currency: "USD",
						trialPeriodDays: 7,
					},
					{
						type: "recurring",
						productId: "price_1M9kHqFkmmuOs718XRvjZ8l1",
						interval: "year",
						amount: 290,
						currency: "USD",
						trialPeriodDays: 7,
					},
				],
			},
			enterprise: {
				isEnterprise: true,
			},
			// lifetime: {
			// 	prices: [
			// 		{
			// 			type: "one-time",
			// 			productId: "price_1PHjoxFkmmuOs718Orzx98rv",
			// 			amount: 799,
			// 			currency: "USD",
			// 		},
			// 	],
			// },
		},
	},
} as const satisfies Config;

export type { Config };
