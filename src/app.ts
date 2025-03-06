import express from 'express'
import { ethers } from 'ethers'
import dotenv from 'dotenv'
import { agentBudgetAbi, usdcAbi } from './abis'

dotenv.config()

const app = express()
app.use(express.json())

const provider = new ethers.JsonRpcProvider(process.env.ELECTRONEUM_RPC_URL)
const ownerWallet = new ethers.Wallet(process.env.ELECTRONEUM_PRIVATE_KEY!, provider) // Admin wallet

const agentBudget = new ethers.Contract(process.env.CONTRACT_ADDRESS!, agentBudgetAbi, ownerWallet)
const usdc = new ethers.Contract(process.env.USDC_ADDRESS!, usdcAbi, ownerWallet)

// Simulated agent key store (replace with secure storage in production)
const agents: Record<string, string> = {
  '0x452eca33ed73b14f31f698467e9618dfee5f461d': process.env.AGENT_PRIVATE_KEY!,
  // Add more agents: "address": "private_key"
}

app.post('/sendPayment', async (req: any, res: any) => {
  try {
    const { agentId, destination, amount, memo } = req.body

    if (!agents[agentId]) {
      return res.status(400).json({ error: 'Unregistered agent' })
    }

    const amountWei = ethers.parseUnits(amount.toString(), 6)
    const agentWallet = new ethers.Wallet(agents[agentId], provider)

    // Check balance
    const usdcAgent: any = usdc.connect(agentWallet)
    const balance = await usdcAgent.balanceOf(agentId)

    if (balance < amountWei) {
      return res.status(400).json({ error: 'Insufficient USDC' })
    }

    // Approve AgentBudget (if not already done)
    const approveTx = await usdcAgent.approve(process.env.CONTRACT_ADDRESS, amountWei)
    await approveTx.wait()

    // Send payment
    const agentContract: any = agentBudget.connect(agentWallet)
    const tx = await agentContract.sendPayment(destination, amountWei)
    const receipt = await tx.wait()

    res.json({
      success: true,
      payment: {
        agentId,
        destination,
        amount,
        memo,
        txHash: receipt.transactionHash,
      },
    })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Owner registers an agent
app.post('/registerAgent', async (req: any, res: any) => {
  try {
    const { agentId, budget } = req.body
    const budgetWei = ethers.parseUnits(budget.toString(), 6)

    const tx = await agentBudget.registerAgent(agentId, budgetWei)
    await tx.wait()

    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3000, () => console.log('API running on port 3000'))
