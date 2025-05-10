"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function AirdropPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show popup after a short delay when the page loads
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleGetAirdrop = () => {
    window.open("https://lazor-drop.vercel.app/", "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 text-gray-400 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={18} />
          </Button>
          <DialogTitle className="text-xl font-bold text-white">Get Solana Airdrop</DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            Claim your free Solana tokens to start swapping on the Devnet.
          </DialogDescription>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-center space-x-2 text-center">
            <div className="text-5xl">🪂</div>
            <div className="text-5xl">⚡</div>
          </div>
          <p className="text-center text-gray-300">
            Need tokens for testing? Get free Solana and other tokens for the Devnet.
          </p>
          <Button
            onClick={handleGetAirdrop}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2"
          >
            Claim Airdrop
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
