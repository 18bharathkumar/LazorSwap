// Format a number with commas
export const formatNumber = (num: number, decimals = 2) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

// Format a number as currency
export const formatCurrency = (num: number, currency = "USD", decimals = 2) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

// Format a percentage
export const formatPercent = (num: number, decimals = 2) => {
  return `${num.toFixed(decimals)}%`
}

// Format a token amount based on decimals
export const formatTokenAmount = (amount: number | string, decimals = 6) => {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount

  if (isNaN(num)) return "0"

  if (num === 0) return "0"

  if (num < 0.000001) {
    return num.toExponential(2)
  }

  if (num < 0.01) {
    return num.toFixed(6)
  }

  if (num < 1) {
    return num.toFixed(4)
  }

  if (num < 1000) {
    return num.toFixed(2)
  }

  if (num < 1000000) {
    return `${(num / 1000).toFixed(2)}K`
  }

  return `${(num / 1000000).toFixed(2)}M`
}

// Format a wallet address
export const formatAddress = (address: string, chars = 4) => {
  if (!address) return ""
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}
