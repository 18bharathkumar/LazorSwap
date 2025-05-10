"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample token data
const tokens = [
  { symbol: "SOL", name: "Solana", icon: "⚡",  },
  { symbol: "USDC", name: "USD Coin", icon: "🔵",  },
  { symbol: "Lazy-Token", name: "Lazy-Token", icon: "🟢", },
  { symbol: "Lazor-Token", name: "Lazor-Token", icon: "🟠",  },
 
]

type TokenSelectorProps = {
  selectedToken: {
    symbol: string
    icon: string
    balance: string
  }
  onSelect: (token: { symbol: string; icon: string; balance: string }) => void
  side: string
}

export function TokenSelector({ selectedToken, onSelect, side }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTokens = tokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelect = (token: (typeof tokens)[0]) => {
    onSelect({
      symbol: token.symbol,
      icon: token.icon,
      balance:""
    })
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 h-10 px-3 bg-background/30 border-gray-700 hover:bg-background/50"
        >
          <span className="text-xl">{selectedToken.icon}</span>
          <span>{selectedToken.symbol}</span>
          <ChevronDown size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input
            placeholder="Search by name or symbol"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/20 border-gray-700"
          />

          <ScrollArea className="h-72">
            <div className="space-y-1">
              {filteredTokens.map((token) => (
                <Button
                  key={token.symbol}
                  variant="ghost"
                  className="w-full justify-start text-left h-14 hover:bg-background/20"
                  onClick={() => handleSelect(token)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{token.icon}</div>
                    <div>
                      <div className="font-medium">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.name}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-sm text-gray-400">Balance</div>
                    </div>
                  </div>
                </Button>
              ))}

              {filteredTokens.length === 0 && (
                <div className="py-6 text-center text-gray-400">No tokens found matching "{searchQuery}"</div>
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
