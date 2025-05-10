import { NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import { getConnection } from "@/lib/solana"; // <-- assumes you have this helper
import { lamportsToSol } from "@/lib/solana";

export async function POST(request: Request) {
  try {
    const { tokenA, tokenB, amountA, amountB, walletAddress } = await request.json();

    // Basic validation
    if (
      !tokenA ||
      !tokenB ||
      !amountA ||
      !amountB ||
      !walletAddress ||
      typeof tokenA !== "string" ||
      typeof tokenB !== "string" ||
      typeof walletAddress !== "string"
    ) {
      return NextResponse.json({ error: "Missing or invalid parameters" }, { status: 400 });
    }

    const parsedAmountA = Number.parseFloat(amountA);
    const parsedAmountB = Number.parseFloat(amountB);

    if (isNaN(parsedAmountA) || isNaN(parsedAmountB)) {
      return NextResponse.json({ error: "Invalid amount format" }, { status: 400 });
    }

    const connection = getConnection(); // uses shared helper

    // ⛏️ TODO: Replace this block with actual token swap + liquidity logic
    const simulatedTxId = "SimTx_" + Math.random().toString(36).slice(2, 10);
    const simulatedLpTokens = ((parsedAmountA * parsedAmountB) / 100).toFixed(6);
    const poolShare = ((parsedAmountA * parsedAmountB) / 1000).toFixed(2);

    // Optional: you could check if `walletAddress` is valid
    new PublicKey(walletAddress); // throws if invalid

    await new Promise((res) => setTimeout(res, 1000)); // simulate delay

    return NextResponse.json({
      success: true,
      txId: simulatedTxId,
      lpTokens: simulatedLpTokens,
      poolShare,
    });
  } catch (error: any) {
    console.error("Add liquidity error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
