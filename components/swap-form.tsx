"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowDown, Settings } from "lucide-react"
import { TokenSelector } from "@/components/token-selector"
import { useWalletContext } from "@/components/wallet-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { loadTokenSwap,executeSwap } from "@/lib/tokenSwap"
import { Connection, PublicKey } from "@solana/web3.js"
import { useWallet } from "@lazorkit/wallet"


export function SwapForm() {
  const { isConnected } = useWalletContext()
  const [sellAmount, setSellAmount] = useState("")
  const [buyAmount, setBuyAmount] = useState("")
  const [slippage, setSlippage] = useState("1")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isSwapping, setIsSwapping] = useState(false)

  const [selectedSellToken, setSelectedSellToken] = useState({
    symbol: "USDC",
    icon: "🔵",
    balance: "0",
  })

  const [selectedBuyToken, setSelectedBuyToken] = useState({
    symbol: "SOL",
    icon: "⚡",
    balance: "0",
  })

  // Simulate exchange rate calculation
  useEffect(() => {
    if (sellAmount && !isNaN(Number.parseFloat(sellAmount))) {
      const rate = 0.034916055 // Example rate from the screenshot
      const calculatedAmount = (Number.parseFloat(sellAmount) * rate).toFixed(9)
      setBuyAmount(calculatedAmount)
    } else {
      setBuyAmount("")
    }
  }, [sellAmount, selectedSellToken, selectedBuyToken])

  const handleSwap = async () => {
  if (!isConnected) return;

  setIsSwapping(true);

  try {
    const connection = new Connection("https://rpc.lazorkit.xyz");
    const tokenSwapAddress = new PublicKey("FjhNkgrGQSBuG6hr1HyaTHFn6DtNcnGuMq4ZN7ytaQS7");
    // Load TokenSwap instance inside handleSwap

    const wallet = useWallet()

    const payer = new PublicKey(wallet.smartWalletAuthorityPubkey)
    const tokenSwapInstance = await loadTokenSwap(connection, tokenSwapAddress, payer);

    const txId = await executeSwap(
      connection,
      tokenSwapInstance,
      userSourceTokenAccount,
      userDestinationTokenAccount,
      userTransferAuthority,
      BigInt(sellAmount),
      BigInt(10),
    );

    console.log("Swap transaction successful:", txId);
    setSellAmount("");
    setBuyAmount("");
    alert("Swap successful!");
  } catch (error) {
    console.error("Swap failed:", error);
    alert("Swap failed. Please try again.");
  } finally {
    setIsSwapping(false);
  }
};


  const handleSwitchTokens = () => {
    const tempToken = selectedSellToken
    setSelectedSellToken(selectedBuyToken)
    setSelectedBuyToken(tempToken)

    // Reset amounts
    setSellAmount("")
    setBuyAmount("")
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Selling</span>
          <span>
            Balance: {selectedSellToken.balance} {selectedSellToken.symbol}
          </span>
        </div>

        <div className="flex items-center space-x-2 bg-background/20 rounded-lg p-3">
          <TokenSelector selectedToken={selectedSellToken} onSelect={setSelectedSellToken} side="sell" />
          <Input
            type="text"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            placeholder="0.00"
            className="border-0 bg-transparent text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-background/30 hover:bg-background/50"
          onClick={handleSwitchTokens}
        >
          <ArrowDown size={20} />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Buying</span>
          <span>
            Balance: {selectedBuyToken.balance} {selectedBuyToken.symbol}
          </span>
        </div>

        <div className="flex items-center space-x-2 bg-background/20 rounded-lg p-3">
          <TokenSelector selectedToken={selectedBuyToken} onSelect={setSelectedBuyToken} side="buy" />
          <Input
            type="text"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            placeholder="0.00"
            className="border-0 bg-transparent text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
            readOnly
          />
        </div>
      </div>

      <div className="pt-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Slippage Tolerance</span>
            <Select value={slippage} onValueChange={setSlippage}>
              <SelectTrigger className="w-20 h-7 text-xs bg-background/20 border-gray-700">
                <SelectValue placeholder="1%" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">0.1%</SelectItem>
                <SelectItem value="0.5">0.5%</SelectItem>
                <SelectItem value="1">1%</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400"
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          >
            <Settings size={18} />
          </Button>
        </div>

        <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <CollapsibleContent className="space-y-3 bg-background/20 p-3 rounded-lg mt-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="auto-routing" className="text-sm">
                Auto Routing
              </Label>
              <Switch id="auto-routing" defaultChecked />
            </div>

            <div className="space-y-1">
              <Label className="text-sm">Max Slippage</Label>
              <Slider defaultValue={[1]} max={5} step={0.1} />
              <div className="flex justify-between text-xs text-gray-400">
                <span>0.1%</span>
                <span>5%</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="pt-2">
        <Button
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!isConnected || !sellAmount || isSwapping}
          onClick={handleSwap}
        >
          {isSwapping ? "Swapping..." : "Swap"}
        </Button>
      </div>

      {sellAmount && buyAmount && (
        <div className="text-sm text-gray-400 pt-2">
          <div className="flex justify-between">
            <span>Rate</span>
            <span>
              1 {selectedSellToken.symbol} = {(Number.parseFloat(buyAmount) / Number.parseFloat(sellAmount)).toFixed(8)}{" "}
              {selectedBuyToken.symbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Fee</span>
            <span>0.25%</span>
          </div>
          <div className="flex justify-between">
            <span>Min. Received</span>
            <span>
              {(Number.parseFloat(buyAmount) * 0.99).toFixed(8)} {selectedBuyToken.symbol}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
