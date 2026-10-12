import WebSocket from 'ws'

const KRAKEN_WS_URL = 'wss://ws.kraken.com/v2'

const symbols = [
  'BTC/USD',
  'ETH/USD',
  'SOL/USD',
  'XRP/USD',
  'BNB/USD',
  'DOGE/USD',
  'ADA/USD',
  'AVAX/USD',
]

export type KrakenTicker = {
  symbol: string
  last: number
  changePct: number
  high: number
  low: number
  volume: number
}

class KrakenService {
  private ws: WebSocket | null = null
  private tickerData = new Map<string, KrakenTicker>()

  connect() {
    this.ws = new WebSocket(KRAKEN_WS_URL)

    this.ws.on('open', () => {
      console.log('Connected to Kraken WebSocket')

      this.ws?.send(
        JSON.stringify({
          method: 'subscribe',
          params: {
            channel: 'ticker',
            symbol: symbols,
            event_trigger: 'trades',
            snapshot: true,
          },
        }),
      )
    })

    this.ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString())

        if (data.channel !== 'ticker' || !data.data) {
          return
        }

        for (const ticker of data.data) {
          this.tickerData.set(ticker.symbol, {
            symbol: ticker.symbol,
            last: Number(ticker.last),
            changePct: Number(ticker.change_pct),
            high: Number(ticker.high),
            low: Number(ticker.low),
            volume: Number(ticker.volume),
          })
        }
      } catch (error) {
        console.error('Failed to parse Kraken message:', error)
      }
    })

    this.ws.on('error', (error) => {
      console.error('Kraken WebSocket error:', error)
    })

    this.ws.on('close', () => {
      console.log('Kraken WebSocket disconnected')
    })
  }

  getTickers() {
    return Array.from(this.tickerData.values())
  }

  getTicker(symbol: string) {
    return this.tickerData.get(symbol)
  }
}

export const krakenService = new KrakenService()