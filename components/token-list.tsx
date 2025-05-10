"use client"
import { Button } from "@/components/ui/button"

// Sample token data with price changes
const popularTokens = [
  { symbol: "SOL", icon: "⚡", change: "+2.5%" },
  { symbol: "Lazor-Token", icon: "🔵", change: "0.0%" },
  { symbol: "Lazy-Token", icon: "🟠", change: "-1.2%" },
]

export function TokenList() {
  return (
    <div className="flex space-x-2 overflow-x-auto py-2 px-1 max-w-full scrollbar-hide">
      {popularTokens.map((token, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex items-center space-x-2 h-8 px-3 bg-background/20 border-gray-700 hover:bg-background/40 whitespace-nowrap"
        >
          
          <span>{token.icon}</span>
          <span>{token.symbol}</span>
          <span
            className={
              token.change.startsWith("+")
                ? "text-green-500"
                : token.change === "0.0%"
                  ? "text-gray-400"
                  : "text-red-500"
            }
          >
            {token.change}
          </span>
        </Button>
      ))}
    </div>
  )
}
