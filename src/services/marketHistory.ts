import type { LivelinePoint } from 'liveline'

type MarketCandle = {
  time: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

type MarketHistoryResponse = {
  symbol: string
  timeframe: string
  data: MarketCandle[]
}

//request historical market candles from the backend API.
export async function fetchMarketHistory(
  symbol: string,
  timeframe: string,
): Promise<LivelinePoint[]> {
  const params = new URLSearchParams({ symbol, timeframe })

  const response = await fetch(`/api/market-history?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch market history: ${response.status}`)
  }

  const result = (await response.json()) as MarketHistoryResponse

  //convert Kraken candles into the data format required by Liveline..
    return result.data.map(candle => ({
    time: candle.time,
    value: candle.close,
    }))
}