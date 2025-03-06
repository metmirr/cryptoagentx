import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import dotenv from 'dotenv'

dotenv.config()

export default buildModule('AgentBudget', (m) => {
  const mockUsdcAddress = process.env.MOCK_USDC_ADDRESS

  if (!mockUsdcAddress) {
    throw new Error('Required environment variables are not set')
  }

  const agent = m.contract('AgentBudget', [mockUsdcAddress])

  return { agent }
})
