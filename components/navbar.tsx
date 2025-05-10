"use client"

import { useWalletContext } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Settings, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Navbar() {
  const { isConnected, connect, disconnect, shortAddress, isLoading } = useWalletContext()
  const [activeTab, setActiveTab] = useState("swap")

  return (
    <div className="flex items-center justify-between py-4 px-6">
      <div className="flex items-center space-x-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
            <span className="text-white font-bold">LS</span>
          </div>
          <span className="text-white font-bold text-xl">LazorSwap</span>
        </Link>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-background/10 backdrop-blur-sm">
            <TabsTrigger value="spot" className="data-[state=active]:bg-background/20">
              Spot
            </TabsTrigger>
            <TabsTrigger value="pro" className="data-[state=active]:bg-background/20">
              Pro
              <span className="ml-1 text-xs px-1 py-0.5 bg-green-500 text-white rounded-sm">New</span>
            </TabsTrigger>
            <TabsTrigger value="perps" className="data-[state=active]:bg-background/20">
              Perps
            </TabsTrigger>
            <TabsTrigger value="more" className="data-[state=active]:bg-background/20">
              More
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" className="bg-background/20 border-gray-700">
          <span className="mr-2">Portfolio</span>
          <ChevronDown size={16} />
        </Button>

        <Button variant="ghost" size="icon" className="text-gray-400">
          <Settings size={20} />
        </Button>

        {isConnected ? (
          <Button
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white border-none"
            onClick={() => disconnect()}
          >
            {shortAddress}
          </Button>
        ) : (
          <Button
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white border-none"
            onClick={() => connect()}
            disabled={isLoading}
          >
            {isLoading ? "Connecting..." : "Connect"}
          </Button>
        )}
      </div>
    </div>
  )
}
