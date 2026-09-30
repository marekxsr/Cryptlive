import MarketChart from './components/MarketChart'

function App() {
  return (
    <main className="market-page">
      <section className="chart-section">

        <div className="market-header">
          <p className="market-pair">Bitcoin / USD</p>

          <h1 className="market-price">$114,523.42</h1>

          <p className="market-change">+2.48% (24h)</p>
        </div>

        <MarketChart />

        <nav
          className="timeframes"
          aria-label="Chart timeframe"
        >
          <button type="button">1m</button>
          <button type="button" className="active">5m</button>
          <button type="button">15m</button>
          <button type="button">1h</button>
          <button type="button">4h</button>
          <button type="button">1D</button>
          <button type="button">1W</button>
          <button type="button">1M</button>
        </nav>

      </section>
    </main>
  )
}

export default App