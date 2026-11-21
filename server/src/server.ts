import express from 'express'
import cors from 'cors'
import { krakenService } from './services/kraken'
import { fetchMarketHistory } from './services/marketHistory'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Cryptlive backend is running',
  })
})

app.get('/api/market', (_req, res) => {
  res.json({
    data: krakenService.getTickers(),
  })
})
//market History API
//retrieves historical cryptocurrency price data from Kraken
//based on the selected trading pair and timeframe.
app.get('/api/market-history', async (req, res) => {
  const symbol = req.query.symbol
  const timeframe = req.query.timeframe

  if (
    typeof symbol !== 'string' ||
    typeof timeframe !== 'string'
  ) {
    res.status(400).json({
      error: 'Symbol and timeframe are required',
    })
    return
  }

  try {
    const candles = await fetchMarketHistory(symbol, timeframe)

    res.json({
      symbol,
      timeframe,
      data: candles,
    })
  } catch (error) {
    console.error('Market history error:', error)

    res.status(502).json({
      error: 'Unable to retrieve market history',
    })
  }
})

krakenService.connect()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})