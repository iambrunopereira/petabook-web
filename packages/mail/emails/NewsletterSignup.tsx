import { Container, Heading, Section, Text } from "@react-email/components";
import { createTranslator } from "use-intl/core";
import type { BaseMailProps } from "../types";
import Wrapper from "./components/Wrapper";

export function NewsletterSignup({ locale, translations }: BaseMailProps) {
	const t = createTranslator({
		locale,
		messages: translations,
	});

	return (
		<Wrapper>
			<Section className="bg-card p-8">
				<Container>
					<Heading as="h1">{t("mail.newsletterSignup.subject")}</Heading>
					<Text>{t("mail.newsletterSignup.body")}</Text>
				</Container>
			</Section>
		</Wrapper>
	);
}

export default NewsletterSignup;
