import express from 'express'
import cors from 'cors'
import { krakenService } from './services/kraken'

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

krakenService.connect()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})