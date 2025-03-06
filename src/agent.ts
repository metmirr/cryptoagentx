import { StructuredTool } from '@langchain/core/tools'
import { z } from 'zod' // For schema validation (like Pydantic)
import axios from 'axios'
import { ChatOpenAI } from '@langchain/openai'
import dotenv from 'dotenv'

dotenv.config()

// Initialize the LLM and agent
async function main() {
  const model = new ChatOpenAI({ model: 'gpt-4o' })

  const modelWithTools = model.bind({
    tools: [
      {
        type: 'function',
        function: {
          name: 'payment',
          description: 'Can perform payment operations.',
          parameters: {
            type: 'object',
            properties: {
              agentId: {
                type: 'string',
                description: "The agent's wallet address (e.g., 0x452eca33ed73b14f31f698467e9618dfee5f461d)",
              },
              destination: {
                type: 'string',
                description: "The recipient's wallet address (e.g., 0x5032f73a75480830685cd71a9542ece9959d8dff)",
              },
              amount: { type: 'string', description: 'Amount in USDC as a string (e.g., "1")' },
              memo: { type: 'string', description: 'Payment description (e.g., "service payment")' },
            },
            required: ['agentId', 'destination', 'amount', 'memo'],
          },
        },
      },
    ],
  })

  const result = await modelWithTools.invoke(
    `Send 1 USDC from agent 0x452eca33ed73b14f31f698467e9618dfee5f461d to 0x5032f73a75480830685cd71a9542ece9959d8dff for a service payment.`
  )

  const payment = result.tool_calls?.[0]?.args
  console.log(payment)
  const response = await axios.post('http://localhost:3000/sendPayment', payment, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log(response.data)
}

main().catch(console.error)
