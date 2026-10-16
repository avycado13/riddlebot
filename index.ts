import "dotenv/config";

import { App } from "@slack/bolt";
import axios from "axios";

if (!process.env.SLACK_BOT_TOKEN || !process.env.SLACK_APP_TOKEN) {
	console.log(
		"Make sure you set your SLACK_BOT_TOKEN and SLACK_APP_TOKEN correctly",
	);
}

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	appToken: process.env.SLACK_APP_TOKEN,
	socketMode: true,
});

app.command("/riddlebot-ping", async ({ ack, respond }) => {
	console.log("ping message recieved");
	const start = Date.now();
	await ack();
	const latency = Date.now() - start;
	await respond({ text: `Pong!\nLatency: ${latency}ms` });
});
app.command("/riddlebot-help", async ({ ack, respond }) => {
	await ack();
	await respond({
		text: `Available Commands:
	/riddlebot-ping - Check bot latency
	/riddle-me-this - Get a riddle`,
	});
});

app.command("/riddlebot-catfact", async ({ ack, respond }) => {
	await ack();

	try {
		const response = await axios.get("https://catfact.ninja/fact");
		await respond({ text: `Cat Fact:\n${response.data.fact}` });
	} catch (err) {
		console.error("error when fetching cat fact: ", err);
		await respond({ text: "Failed to fetch a cat fact." });
	}
});

app.command("/riddle-me-this", async ({ ack, respond }) => {
	await ack();

	try {
		const response = await axios.get("https://riddles-api.vercel.app/random");
		await respond({ text: `Riddle:\n${response.data.riddle}` });
	} catch (err) {
		console.error("error when fetching riddle: ", err);
		await respond({ text: "Failed to fetch a riddle." });
	}
});

(async () => {
	await app.start();
	console.log("riddlebot is running!");
})();
