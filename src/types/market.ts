export type MarketTicker = {
  symbol: string
  last: number
  changePct: number // Short for change percentage: how much the price has changed.
  high: number
  low: number
  volume: number
}

export type MarketResponse = {
  data: MarketTicker[] // Market data
}
