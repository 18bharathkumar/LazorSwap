"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TokenSelector } from "@/components/token-selector"
import { useWalletContext } from "@/components/wallet-provider"
import { Plus } from "lucide-react"

export function LiquidityForm() {
  const { isConnected } = useWalletContext()
  const [tokenAAmount, setTokenAAmount] = useState("")
  const [tokenBAmount, setTokenBAmount] = useState("")
  const [poolShare, setPoolShare] = useState("0")
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false)

  const [selectedTokenA, setSelectedTokenA] = useState({
    symbol: "SOL",
    icon: "⚡",
    balance: "0",
  })

  const [selectedTokenB, setSelectedTokenB] = useState({
    symbol: "USDC",
    icon: "🔵",
    balance: "0",
  })

  // Calculate pool share when amounts change
  useEffect(() => {
    if (tokenAAmount && tokenBAmount) {
      // This is a simplified calculation for demo purposes
      const calculatedShare = ((Number.parseFloat(tokenAAmount) * Number.parseFloat(tokenBAmount)) / 1000).toFixed(2)
      setPoolShare(calculatedShare)
    } else {
      setPoolShare("0")
    }
  }, [tokenAAmount, tokenBAmount])

  const handleAddLiquidity = async () => {
    if (!isConnected) return

    setIsAddingLiquidity(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Reset form
      setTokenAAmount("")
      setTokenBAmount("")

      // Show success message
      alert("Liquidity added successfully!")
    } catch (error) {
      console.error("Failed to add liquidity:", error)
      alert("Failed to add liquidity. Please try again.")
    } finally {
      setIsAddingLiquidity(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Token A</span>
          <span>
            Balance: {selectedTokenA.balance} {selectedTokenA.symbol}
          </span>
        </div>

        <div className="flex items-center space-x-2 bg-background/20 rounded-lg p-3">
          <TokenSelector selectedToken={selectedTokenA} onSelect={setSelectedTokenA} side="tokenA" />
          <Input
            type="text"
            value={tokenAAmount}
            onChange={(e) => setTokenAAmount(e.target.value)}
            placeholder="0.00"
            className="border-0 bg-transparent text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="rounded-full bg-background/30 p-2">
          <Plus size={16} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Token B</span>
          <span>
            Balance: {selectedTokenB.balance} {selectedTokenB.symbol}
          </span>
        </div>

        <div className="flex items-center space-x-2 bg-background/20 rounded-lg p-3">
          <TokenSelector selectedToken={selectedTokenB} onSelect={setSelectedTokenB} side="tokenB" />
          <Input
            type="text"
            value={tokenBAmount}
            onChange={(e) => setTokenBAmount(e.target.value)}
            placeholder="0.00"
            className="border-0 bg-transparent text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      {tokenAAmount && tokenBAmount && (
        <div className="bg-background/20 p-3 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Pool Share</span>
            <span>{poolShare}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>LP Tokens to Receive</span>
            <span>{(Number.parseFloat(poolShare) * 10).toFixed(6)}</span>
          </div>
        </div>
      )}

      <div className="pt-2">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!isConnected || !tokenAAmount || !tokenBAmount || isAddingLiquidity}
          onClick={handleAddLiquidity}
        >
          {isAddingLiquidity ? "Adding Liquidity..." : "Add Liquidity"}
        </Button>
      </div>
    </div>
  )
}
