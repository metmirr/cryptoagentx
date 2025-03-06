# Electroneum Payment

## Usage

### Register Agent

```bash
curl -X POST http://localhost:3000/registerAgent -H "Content-Type: application/json" -d '{"agentId": "0x452eca33ed73b14f31f698467e9618dfee5f461d", "budget": "100"}'
```

### Send Payment

```bash
curl -X POST http://localhost:3000/sendPayment -H "Content-Type: application/json" -d '{"agentId": "0x452eca33ed73b14f31f698467e9618dfee5f461d", "destination": "0x5032F73A75480830685cd71a9542ECE9959D8dfF", "amount": "1"}'
```

```bash
pnpm install
pnpm build
pnpm start
```
