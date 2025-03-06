// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AgentBudget {
    address public owner;
    IERC20 public usdc;
    mapping(address => uint256) public dailyBudgets;
    mapping(address => uint256) public spentToday;
    mapping(address => uint256) public lastReset;
    mapping(address => bool) public isAgent;

    constructor(address _usdc) {
        owner = msg.sender;
        usdc = IERC20(_usdc);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyAgent() {
        require(isAgent[msg.sender], "Not an agent");
        _;
    }

    // Register an agent with a budget
    function registerAgent(address agent, uint256 budget) external onlyOwner {
        isAgent[agent] = true;
        dailyBudgets[agent] = budget;
    }

    // Reset daily spending
    function resetIfNeeded(address agent) internal {
        if (block.timestamp - lastReset[agent] >= 1 days) {
            spentToday[agent] = 0;
            lastReset[agent] = block.timestamp;
        }
    }

    // Agent sends payment from its own wallet
    function sendPayment(address to, uint256 amount) external onlyAgent {
        address agent = msg.sender;
        resetIfNeeded(agent);
        require(
            spentToday[agent] + amount <= dailyBudgets[agent],
            "Exceeds daily budget"
        );
        spentToday[agent] += amount;
        require(usdc.transferFrom(agent, to, amount), "Transfer failed");
    }
}
