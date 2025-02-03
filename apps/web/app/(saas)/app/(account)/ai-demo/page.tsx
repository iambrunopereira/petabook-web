import { PageHeader } from "@saas/shared/components/PageHeader";
import { ProductNameGenerator } from "@saas/start/components/ProductNameGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";

export default function AiDemoPage() {
	return (
		<div className="">
			<PageHeader
				title="AI Demo"
				subtitle="This demo shows an example integration of the OpenAI API"
			/>
			<Card>
				<CardHeader>
					<CardTitle>Product Name Generator</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="mb-4">
						Enter a topic and we will generate some funny product names for you:
					</p>
					<ProductNameGenerator />
				</CardContent>
			</Card>
		</div>
	);
}
