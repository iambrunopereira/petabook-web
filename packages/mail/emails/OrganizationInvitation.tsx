import { Heading, Link, Text } from "@react-email/components";
import { createTranslator } from "use-intl/core";
import type { BaseMailProps } from "../types";
import PrimaryButton from "./components/PrimaryButton";
import Wrapper from "./components/Wrapper";

export function OrganizationInvitation({
	url,
	organizationName,
	locale,
	translations,
}: {
	url: string;
	organizationName: string;
} & BaseMailProps) {
	const t = createTranslator({
		locale,
		messages: translations,
	});

	return (
		<Wrapper>
			<Heading className="text-xl">
				{t.markup("mail.organizationInvitation.headline", {
					organizationName,
					strong: (chunks) => `<strong>${chunks}</strong>`,
				})}
			</Heading>
			<Text>{t("mail.organizationInvitation.body", { organizationName })}</Text>

			<PrimaryButton href={url}>
				{t("mail.organizationInvitation.join")}
			</PrimaryButton>

			<Text className="mt-4 text-muted-foreground text-sm">
				{t("mail.common.openLinkInBrowser")}
				<Link href={url}>{url}</Link>
			</Text>
		</Wrapper>
	);
}

export default OrganizationInvitation;
