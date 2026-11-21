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
}

const timeIntervals: Record<string, number> = {
  '1m': 1,
  '5m': 5,
  '15m': 15,
  '1h': 60,
  '4h': 240,
  '1D': 1440,
  '1W': 10080,
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
  const interval = timeIntervals[timeframe]

  if (!pair || !interval) {
    throw new Error('Unsupported trading pair or timeframe')
  }

  const cacheKey = `${pair}:${interval}`
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

  if (validCandles.length === 0) {
    throw new Error('No valid market candles received')
  }

  historyCache.set(cacheKey, {
    candles: validCandles,
    expiresAt: Date.now() + 15000,
  })

  return validCandles
}
