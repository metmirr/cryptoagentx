export const agentBudgetAbi = [
  'function sendPayment(address to, uint256 amount) external',
  'function registerAgent(address agent, uint256 budget) external',
]

export const usdcAbi = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function balanceOf(address account) external view returns (uint256)',
]
