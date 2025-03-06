"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("@nomicfoundation/hardhat-ignition/modules");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (0, modules_1.buildModule)('AgentBudget', (m) => {
    const mockUsdcAddress = process.env.MOCK_USDC_ADDRESS;
    if (!mockUsdcAddress) {
        throw new Error('Required environment variables are not set');
    }
    const agent = m.contract('AgentBudget', [mockUsdcAddress]);
    return { agent };
});
