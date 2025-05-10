# 🚀 LazorSwap

## 🔗 Quick Summary

**LazorSwap** is a simple and secure Solana-based DApp where users can swap between **Lazy-Token** and **SOL**, and also provide or withdraw liquidity to earn **Lazor-Tokens (LP tokens)**. Everything is done using **passkey-based wallets** from **LazorKit** — no passwords, no browser extensions, just fast and safe.

---

## 🔐 What is LazorKit?

**LazorKit** is a toolkit that helps Solana apps use **Passkeys** instead of private keys or browser wallets.

With LazorKit:

- ✅ You can log in with **WebAuthn passkeys** (like Face ID or fingerprint).
- ✅ No passwords or seed phrases involved.
- ✅ Transactions are signed securely using  (secp256r1).
- ✅ It's smooth, safe, and built for real people.

---

## ⚙️ What Can You Do on LazorSwap?

### ✅ Main Features:

1. **🔑 Connect Wallet**
    - Just use your device’s passkey (like Face ID).
    - No wallet extensions or copying private keys.
2. **💰 Check Balances**
    - See how much you have of:
        - SOL
        - Lazy-Token (custom token)
        - Lazor-Token (LP token)
3. **🔄 Swap Tokens**
    - Swap between Lazy-Token and SOL (we use wSOL under the hood).
    - It’s quick and uses Solana’s Token Swap program.
4. **📥 Add Liquidity**
    - Put in Lazy-Token + wSOL to earn Lazor-Tokens (your LP share).
5. **📤 Remove Liquidity**
    - Use your Lazor-Tokens to get back the tokens .

---

## 🔧 How It Works (In Simple Terms)

### 🪙 Tokens Involved:

- **Lazy-Token**: Custom token you create.
- **Lazor-Token**: LP token you get when you add liquidity.
- **wSOL**: Wrapped SOL used for swaps and pools.

---

### 🧱 Behind the Scenes:

1. **Token Swap Contract**
    
    We use Solana’s official [SPL Token Swap](https://github.com/solana-labs/solana-program-library/tree/master/token-swap/program) program.
    
2. **Get Authority Address**

```jsx

const [authority] = await PublicKey.findProgramAddress(
  [tokenSwapAccount.publicKey.toBuffer()],
  TOKEN_SWAP_PROGRAM_ID
);

```

This `authority` is used by the swap program to control token accounts.

1. **Create Token Mints + Accounts**
    - Mint Lazy-Token (you control it).
    - Mint Lazor-Token (swap program controls it).
    - Create a wSOL account by wrapping SOL.
2. **Initialize the Swap Pool**

```jsx

tokenSwap = await TokenSwap.createTokenSwap(
  connection,
  payer,
  tokenSwapAccount,
  authority,
  tokenAccountA, // wSOL
  tokenAccountB, // Lazy-Token
  tokenPool,
  WSOL_MINT,
  mintB,
  feeAccount,
  await createAccount(connection, payer, tokenPool, payer.publicKey),
  TOKEN_SWAP_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  25n, // trade fee
  10000n,
  5n,  // owner fee
  10000n,
  1n,  // host fee
  6n,
  0n,  // curve type (constant product)
  0n,
  CurveType.ConstantProduct
);

```

1. **Add Liquidity**

```jsx

await tokenSwap.depositAllTokenTypes(
  userAccountA,
  userAccountB,
  userPoolAccount,
  TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  userTransferAuthority,
  POOL_TOKEN_AMOUNT,
  tokenA,
  tokenB,
  confirmOptions
);

```

1. **Swap Lazy-Token ↔ SOL (wSOL)**

```jsx

await tokenSwap.swap(
  userWSOLAccount,
  tokenAccountA,
  tokenAccountB,
  userCustomAccount,
  WSOL_MINT,
  mintB,
  TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  null,
  userTransferAuthority,
  BigInt(swapAmount),
  0n
);

```

1. **Withdraw Liquidity**

```jsx

await tokenSwap.withdrawAllTokenTypes(
  userPoolTokenAccount,
  tokenAccountA,
  tokenAccountB,
  userAccountA,
  userAccountB,
  TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  userTransferAuthority,
  BigInt(withdrawAmount),
  0n,
  0n
);

```

---

## 🔏 Signing Transactions

All transactions (swaps, deposits, withdrawals) are signed using **LazorKit Wallet**. No private key exposure. No extensions. It’s all secured through passkeys — the same tech used for modern passwordless login.

---

## 🧰 Tech Stack / Libraries

- `@solana/web3.js` – Solana blockchain stuff
- `@solana/spl-token` – For token operations
- `@solana/spl-token-swap` – For the swap logic
- `lazorkit` – For passkey login and transaction signing
