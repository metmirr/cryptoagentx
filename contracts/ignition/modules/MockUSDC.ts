import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import dotenv from 'dotenv'

dotenv.config()

export default buildModule('MockUSDC', (m) => {
  const mockUSDC = m.contract('MockUSDC', [])

  return { mockUSDC }
})
