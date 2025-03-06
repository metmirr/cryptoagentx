import { ethers } from 'ethers'

const provider = new ethers.JsonRpcProvider(process.env.ELECTRONEUM_RPC_URL)
const wallet = ethers.Wallet.createRandom(provider)

console.log(wallet.address)
console.log(wallet.privateKey)
