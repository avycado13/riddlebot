# riddlebot
A slackbot for your daily dose of riddles

## Features
- Fresh riddles every run
- cat facts command
- ping for debugging
- help command
- Run with systemd on my NixOS server
- Takes full advantage of TypeScript where possible

## Usage
To get a riddle, run `/riddle-me-this`. To get a Cat Fact run `/riddlebot-catfact`. To Ping my server and check if the bot is up, run `/riddlebot-ping`

## Installing / Development
To install dependencies:

```bash
pnpm install
```

To run:

```bash
node index.ts
```
In [`manifest.json`](./manifest.json), there is the slack app manifest for this.

## AI Use
I did not use AI in the making of this Slack App. I use AI to briefly help debug my Server configuration being weird.
