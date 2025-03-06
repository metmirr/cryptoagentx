# CryptoAgentX

CryptoAgentX is the financial infrastructure that empowers AI Agents to move money securely and efficiently.

## Quick Start

```bash
cp .env.example .env
# Update openai api key in .env
```

```bash
pnpm install && pnpm build
pnpm start
```

```bash
node dist/agent.js
```

## Project Structure

contracts/ # Smart contracts
src/ # TypeScript backend service and agent integration

## Usage

Copy `.env.example` to `.env` and update the variables.

### Install Dependencies and Build (First Time Only)

```bash
pnpm install
pnpm build
```

### Start the Service

```bash
pnpm start
```

### Register Agent with Budget

```bash
curl -X POST http://localhost:3000/registerAgent -H "Content-Type: application/json" -d '{"agentId": "0x452eca33ed73b14f31f698467e9618dfee5f461d", "budget": "100"}'
```

**Make sure to update `agents` object to include the agent's private key and address in `src/app.ts`**

### Send Payment

Before sending a payment, you must register the agent first and fund the agent's wallet with USDC. [See Contracts README for more details](./contracts/README.md)

There are 2 ways to test the payment either directly calling the API or using ai agent [agent.ts](./src/agent.ts)

#### AI Agent

**Make sure to update `OPENAI_API_KEY` in `.env`**

```bash
node dist/agent.js
```

#### Direct API Call

```bash
curl -X POST http://localhost:3000/sendPayment -H "Content-Type: application/json" -d '{"agentId": "0x452eca33ed73b14f31f698467e9618dfee5f461d", "destination": "0x5032F73A75480830685cd71a9542ECE9959D8dfF", "amount": "1"}'
```

## TODO

- [ ] UI for registering agent and setting budget
- [ ] UI for monitoring agent's balance and spending
- [ ] UI for monitoring all agents's balance and spending
- [ ] UI for chatting with the agent to ask for payment
