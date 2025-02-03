import {
	SQSClient,
	SendMessageCommand,
	type SendMessageCommandInput,
} from "@aws-sdk/client-sqs";

let sqsClient: SQSClient | null = null;

const getSQSClient = () => {
	if (sqsClient) {
		return sqsClient;
	}

	const sqsEndpoint = process.env.SQS_ENDPOINT as string;
	if (!sqsEndpoint) {
		throw new Error("Missing env variable SQS_ENDPOINT");
	}

	const sqsAccessKeyId = process.env.SQS_ACCESS_KEY_ID as string;
	if (!sqsAccessKeyId) {
		throw new Error("Missing env variable SQS_ACCESS_KEY_ID");
	}

	const sqsSecretAccessKey = process.env.SQS_SECRET_ACCESS_KEY as string;
	if (!sqsSecretAccessKey) {
		throw new Error("Missing env variable SQS_SECRET_ACCESS_KEY");
	}

	const sqsRegion = process.env.SQS_REGION as string;
	if (!sqsRegion) {
		throw new Error("Missing env variable SQS_REGION");
	}

	sqsClient = new SQSClient({
		region: sqsRegion,
		endpoint: sqsEndpoint,
		credentials: {
			accessKeyId: sqsAccessKeyId,
			secretAccessKey: sqsSecretAccessKey,
		},
	});

	return sqsClient;
};

export const sendSQSMessage = async (
	message: string,
	messageAttributes: SendMessageCommandInput["MessageAttributes"],
) => {
	const sqsClient = getSQSClient();

	const sqsQueueUrl = process.env.SQS_QUEUE_URL as string;
	if (!sqsQueueUrl) {
		throw new Error("Missing env variable SQS_QUEUE_URL");
	}

	await sqsClient.send(
		new SendMessageCommand({
			QueueUrl: sqsQueueUrl,
			MessageBody: message,
			MessageAttributes: messageAttributes,
		}),
	);
};
