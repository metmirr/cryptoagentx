# CryptoAgentX Contracts

Key Points:
Agents call sendPayment directly, spending their own USDC.

## Deploying Contracts

```bash
npx hardhat ignition deploy ignition/modules/AgentBudget.ts --network electroneum
```

```bash
npx hardhat ignition deploy ignition/modules/MockUSDC.ts --network electroneum
```

## Funding the Agent

Update the `AGENT_ADDRESS` in the `.env` file.

```bash
npx hardhat fund-agent --network electroneum
```
