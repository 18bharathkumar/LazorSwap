import { SwapInterface } from "@/components/swap-interface"
import { AirdropPopup } from "@/components/airdrop-popup"

export default function Home() {
  return (
    <main className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.png')" }}>
      <div className="container mx-auto px-4 py-8">
        <SwapInterface />
        <AirdropPopup />
      </div>
    </main>
  )
}
