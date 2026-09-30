import { Liveline } from 'liveline'
import type { LivelinePoint } from 'liveline'

const now = Math.floor(Date.now() / 1000)

const data: LivelinePoint[] = [
  { time: now - 540, value: 113400 },
  { time: now - 480, value: 113650 },
  { time: now - 420, value: 113520 },
  { time: now - 360, value: 113900 },
  { time: now - 300, value: 114100 },
  { time: now - 240, value: 113850 },
  { time: now - 180, value: 114300 },
  { time: now - 120, value: 114150 },
  { time: now - 60, value: 114500 },
  { time: now, value: 114523 },
]

function MarketChart() {
  return (
    <div className="market-chart">
      <Liveline
        data={data}
        value={114523}
        color="#3b82f6"
        theme="light"
        grid
        scrub
        badge={false}
        pulse={false}
        momentum={false}
        fill={false}
        lineWidth={2}
        window={600}
      />
    </div>
  )
}

export default MarketChart