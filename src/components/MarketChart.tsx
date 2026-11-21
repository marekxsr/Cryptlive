import { Liveline } from 'liveline'
import type { LivelinePoint } from 'liveline'

type MarketChartProps = {
  data: LivelinePoint[]
  value: number
  timeframe: string
}

//сonvert the selected timeframe into seconds.
const timeframeSeconds: Record<string, number> = {
  '1m': 60,
  '5m': 300,
  '15m': 900,
  '1h': 3600,
  '4h': 14400,
  '1D': 86400,
  '1W': 604800,
  '1M': 2592000,
}

function MarketChart({ data, value, timeframe }: MarketChartProps) {
  const windowSeconds =
    (timeframeSeconds[timeframe] ?? 300) * data.length

  return (
    <div className="market-chart">
      <Liveline
        data={data}
        value={value}
        color="#3b82f6"
        theme="light"
        grid
        scrub
        badge={false}
        pulse={false}
        momentum={false}
        fill={false}
        lineWidth={2}
        window={windowSeconds}
      />
    </div>
  )
}

export default MarketChart