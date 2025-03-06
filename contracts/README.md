# CryptoAgentX Contracts

Key Points:
Agents call sendPayment directly, spending their own USDC.
Must approve AgentBudget to spend on their behalf (like Payman’s trust model).

## Deploying Contracts

```bash
npx hardhat ignition deploy ignition/modules/AgentBudget.ts --network electroneum
``` 

```bash
npx hardhat ignition deploy ignition/modules/MockUSDC.ts --network electroneum
```
