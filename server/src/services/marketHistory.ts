export type MarketCandle = {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

const KRAKEN_API_URL = 'https://api.kraken.com/0/public/OHLC'

const tradingPairs: Record<string, string> = {
  'BTC/USD': 'XBTUSD',
  'ETH/USD': 'ETHUSD',
  'SOL/USD': 'SOLUSD',
  'XRP/USD': 'XRPUSD',
  'DOGE/USD': 'DOGEUSD',
  'ADA/USD': 'ADAUSD',
  'AVAX/USD': 'AVAXUSD',
  'BNB/USD': 'BNBUSD',
  'LINK/USD': 'LINKUSD',
}

const timeIntervals: Record<string, number> = {
  '1m': 1,
  '5m': 5,
  '15m': 15,
  '1h': 60,
  '4h': 240,
  '1D': 1440,
  '1W': 10080,
  '1M': 43200,
}

const historyCache = new Map<
  string,
  { candles: MarketCandle[]; expiresAt: number }
>()

export async function fetchMarketHistory(
  symbol: string,
  timeframe: string,
): Promise<MarketCandle[]> {
  const pair = tradingPairs[symbol]
  //kraken provides daily candle, monthly candles are aggregated below
  const interval = timeframe === '1M' ? 1440 : timeIntervals[timeframe]

  if (!pair || !interval) {
    throw new Error('Unsupported trading pair or timeframe')
  }

  // Keep monthly and daily cache entries separate.
  const cacheKey = `${pair}:${timeframe}`
  const cached = historyCache.get(cacheKey)

  if (cached && cached.expiresAt > Date.now()) {
    return cached.candles
  }

  const url = new URL(KRAKEN_API_URL)
  url.searchParams.set('pair', pair)
  url.searchParams.set('interval', String(interval))

  const response = await fetch(url, {
    signal: AbortSignal.timeout(10000),
  })

  if (!response.ok) {
    throw new Error(`Kraken API error: ${response.status}`)
  }

  const result = await response.json()

  if (result.error?.length) {
    throw new Error(result.error.join(', '))
  }

  const candleEntry = Object.entries(result.result).find(
    ([key, value]) => key !== 'last' && Array.isArray(value),
  )

  if (!candleEntry) {
    throw new Error('No market history returned by Kraken')
  }

  const rows = candleEntry[1] as unknown[][]

  const candles = rows.map((row): MarketCandle => ({
    time: Number(row[0]),
    open: Number(row[1]),
    high: Number(row[2]),
    low: Number(row[3]),
    close: Number(row[4]),
    volume: Number(row[6]),
  }))

  const validCandles = candles.filter(
    candle =>
      Number.isFinite(candle.time) &&
      Number.isFinite(candle.close) &&
      candle.close > 0,
  )

  // Combine daily candles into monthly OHLCV candles.
const monthlyCandles: MarketCandle[] = []

if (timeframe === '1M') {
  const monthlyGroups = new Map<string, MarketCandle[]>()

  for (const candle of validCandles) {
    const date = new Date(candle.time * 1000)
    const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`

    const group = monthlyGroups.get(monthKey) ?? []
    group.push(candle)
    monthlyGroups.set(monthKey, group)
  }

  for (const group of monthlyGroups.values()) {
    monthlyCandles.push({
      time: group[0].time,
      open: group[0].open,
      high: Math.max(...group.map(candle => candle.high)),
      low: Math.min(...group.map(candle => candle.low)),
      close: group[group.length - 1].close,
      volume: group.reduce((total, candle) => total + candle.volume, 0),
    })
  }
}

const resultCandles =
  timeframe === '1M' ? monthlyCandles : validCandles

// Sort monthly candles chronologically before returning them.
resultCandles.sort((a, b) => a.time - b.time)

  if (validCandles.length === 0) {
    throw new Error('No valid market candles received')
  }

  historyCache.set(cacheKey, {
    candles: resultCandles,
    expiresAt: Date.now() + 15000,
  })

  return resultCandles
}
