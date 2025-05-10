"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SwapForm } from "@/components/swap-form";
import { LiquidityForm } from "@/components/liquidity-form";
import { Navbar } from "@/components/navbar";
import { TokenList } from "@/components/token-list";
import { useWalletContext } from "@/components/wallet-provider";

export function SwapInterface() {
  const [activeTab, setActiveTab] = useState("instant");
  const [activeForm, setActiveForm] = useState("swap");
  const { isConnected, connect, smartWalletAuthorityPubkey } = useWalletContext();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <TokenList />
          </div>

          <div className="flex justify-center mb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-xs">
              <TabsList className="grid grid-cols-3 bg-background/10 backdrop-blur-sm">
                <TabsTrigger value="instant" className="data-[state=active]:bg-background/20">Instant</TabsTrigger>
                <TabsTrigger value="trigger" className="data-[state=active]:bg-background/20">Trigger</TabsTrigger>
                <TabsTrigger value="recurring" className="data-[state=active]:bg-background/20">Recurring</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              <Button
                variant={activeForm === "swap" ? "default" : "outline"}
                onClick={() => setActiveForm("swap")}
                className={activeForm === "swap" ? "bg-green-600 hover:bg-green-700" : "bg-background/20"}
              >
                Swap
              </Button>
              <Button
                variant={activeForm === "liquidity" ? "default" : "outline"}
                onClick={() => setActiveForm("liquidity")}
                className={activeForm === "liquidity" ? "bg-green-600 hover:bg-green-700" : "bg-background/20"}
              >
                Liquidity
              </Button>
            </div>
          </div>

          <Card className="bg-background/10 backdrop-blur-md border-gray-800">
            <CardContent className="p-4">
              {activeForm === "swap" ? <SwapForm /> : <LiquidityForm />}

              {!isConnected ? (
                <div className="mt-4">
                  <Button
                    onClick={connect}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Connect Wallet
                  </Button>
                </div>
              ) : (
                <div className="mt-2 text-center text-sm text-muted-foreground">
                  Connected: {smartWalletAuthorityPubkey?.slice(0, 6)}...{smartWalletAuthorityPubkey?.slice(-4)}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
