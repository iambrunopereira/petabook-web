"use client";

import Script from "next/script";

const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string;

export function AnalyticsScript() {
	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`}
				strategy="afterInteractive"
			/>
			<Script
				id="gtag-init"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${googleTagId}');
					`,
				}}
			/>
		</>
	);
}

export function useAnalytics() {
	const trackEvent = (event: string, data?: Record<string, unknown>) => {
		if (typeof window === "undefined" || !(window as any).gtag) {
			return;
		}

		(window as any).gtag("event", event, data);
	};

	return {
		trackEvent,
	};
}
