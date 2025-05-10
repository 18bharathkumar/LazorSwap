"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import { useWallet } from "@lazorkit/wallet"

type WalletContextType = ReturnType<typeof useWallet> & {
  shortAddress: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useWallet()
  const [shortAddress, setShortAddress] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Buffer polyfill for browser environment
      window.Buffer = window.Buffer || require("buffer").Buffer
    }
  }, [])

  useEffect(() => {
    if (wallet.smartWalletAuthorityPubkey) {
      const addr = wallet.smartWalletAuthorityPubkey
      setShortAddress(`${addr.slice(0, 4)}...${addr.slice(-4)}`)
    } else {
      setShortAddress(null)
    }
  }, [wallet.smartWalletAuthorityPubkey])

  return <WalletContext.Provider value={{ ...wallet, shortAddress }}>{children}</WalletContext.Provider>
}

export function useWalletContext() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWalletContext must be used within a WalletProvider")
  }
  return context
}
