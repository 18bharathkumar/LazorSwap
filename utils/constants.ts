import { PublicKey } from "@solana/web3.js"

// Solana network
export const SOLANA_NETWORK = "devnet"
export const SOLANA_RPC_URL = "https://api.devnet.solana.com"

// Token mints
export const WSOL_MINT = new PublicKey("So11111111111111111111111111111111111111112")

// Program IDs
export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
export const TOKEN_SWAP_PROGRAM_ID = new PublicKey("SwaPpA9LAaLfeLi3a68M4DjnLqgtticKg6CnyNwgAC8")
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL")

// Fee constants
export const TRADING_FEE_NUMERATOR = 25n
export const TRADING_FEE_DENOMINATOR = 10000n
export const OWNER_TRADING_FEE_NUMERATOR = 5n
export const OWNER_TRADING_FEE_DENOMINATOR = 10000n
export const OWNER_WITHDRAW_FEE_NUMERATOR = 0n
export const OWNER_WITHDRAW_FEE_DENOMINATOR = 0n
export const HOST_FEE_NUMERATOR = 20n
export const HOST_FEE_DENOMINATOR = 100n

// Slippage options
export const SLIPPAGE_OPTIONS = [
  { label: "0.1%", value: "0.1" },
  { label: "0.5%", value: "0.5" },
  { label: "1%", value: "1" },
]

// Default tokens
export const DEFAULT_TOKENS = [
  { symbol: "SOL", name: "Solana", icon: "⚡", decimals: 9 },
  { symbol: "USDC", name: "USD Coin", icon: "🔵", decimals: 6 },
  { symbol: "USDT", name: "Tether", icon: "🟢", decimals: 6 },
  { symbol: "BTC", name: "Bitcoin (Wrapped)", icon: "🟠", decimals: 8 },
  { symbol: "ETH", name: "Ethereum (Wrapped)", icon: "🟣", decimals: 8 },
]
