import { useEffect, useState } from 'react'
import Header from './components/Header'
import MarketChart from './components/MarketChart'
import { fetchMarketData } from './services/market'
import type { MarketTicker } from './types/market'
import Portfolio from './pages/Portfolio'


// Define a type for asset details, including name, icon, and CSS class name.
type AssetDetails = {
  name: string
  icon: string
  className: string
}

// Names and icons used to display Kraken market symbols in the dashboard.
const assetDetails: Record<string, AssetDetails> = {
  'BTC/USD': { name: 'Bitcoin', icon: '₿', className: 'btc' },
  'ETH/USD': { name: 'Ethereum', icon: '◆', className: 'eth' },
  'SOL/USD': { name: 'Solana', icon: '≋', className: 'sol' },
  'XRP/USD': { name: 'XRP', icon: 'X', className: 'xrp' },
  'BNB/USD': { name: 'BNB', icon: '◆', className: 'bnb' },
  'DOGE/USD': { name: 'Dogecoin', icon: 'Ð', className: 'doge' },
  'ADA/USD': { name: 'Cardano', icon: '✣', className: 'ada' },
  'AVAX/USD': { name: 'Avalanche', icon: 'A', className: 'avax' },
}

// Format prices with more decimal places for cheaper coins.
function formatPrice(price: number): string {
  return price < 1
    ? `$${price.toFixed(4)}`
    : `$${price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
}


function App() {
  const [view, setView] = useState<'market' | 'portfolio'>('market')// State to manage the current view
    //store the latest market prices received from our backend.
  const [marketData, setMarketData] = useState<MarketTicker[]>([])
  // Find Bitcoin in the latest market data.
  const bitcoin = marketData.find(
    (ticker) => ticker.symbol === 'BTC/USD',
  )
  //store an error message if the market data request fails.
  const [marketError, setMarketError] = useState('')


  // Load market data when the component opens and refresh it every 5 seconds.
  useEffect(() => {
    let isActive = true

    const loadMarketData = async () => {
      try {
        const response = await fetchMarketData()

        // Update the state only while this component is active.
        if (isActive) {
          setMarketData(response.data)
          setMarketError('')
        }
      } catch (error) {
        // Show an error if the backend cannot provide market data.
        if (isActive) {
          setMarketError(
            error instanceof Error ? error.message : 'Failed to load market data',
          )
        }
      }
    }

    // Fetch data immediately when the component opens.
    void loadMarketData()

    // Refresh the data every 5 seconds.
    const intervalId = window.setInterval(() => {
      void loadMarketData()
    }, 5000)
    // Stop refreshing when the component is removed.
    return () => {
      isActive = false
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <Header view={view} onViewChange={setView} />

      {/* Pass the current view and the function to change it as props to the Header component */}
      {view === 'portfolio' ? (// Render the Portfolio component if the current view is portfolio
        <Portfolio />
      ) : (
      <>
      {marketError && <p role="alert">{marketError}</p>}
      <main className="market-page">
        <div className="dashboard-layout">

          <aside className="assets-sidebar">
            <p className="assets-title">ALL ASSETS ({marketData.length})</p>

            <div className="asset-list">
              {marketData.map((ticker) => {
                const asset = assetDetails[ticker.symbol]

                // Skip symbols that do not have display information yet.
                if (!asset) return null

                const isPositive = ticker.changePct >= 0
                const symbol = ticker.symbol.split('/')[0]

                return (
                  <div
                    className={`asset-row ${ticker.symbol === 'BTC/USD' ? 'active' : ''}`}
                    key={ticker.symbol}
                  >
                    <div className={`asset-icon ${asset.className}`}>
                      {asset.icon}
                    </div>

                    <div className="asset-info">
                      <strong>{symbol}</strong>
                      <span>{asset.name}</span>
                    </div>

                    <div className="asset-price">
                      <strong>{formatPrice(ticker.last)}</strong>
                      <span className={isPositive ? 'positive' : 'negative'}>
                        {isPositive ? '+' : ''}{ticker.changePct.toFixed(2)}%
                      </span>
                    </div>

                    <button
                      className="star"
                      type="button"
                      aria-label={`Favorite ${symbol}`}
                    >
                      ★
                    </button>
                  </div>
                )
              })}
            </div>
          </aside>

          <section className="chart-section">

            {/* Chart section */}
            <div className="market-info">
              <div className="market-main">
                <div className="market-name">Bitcoin / USD</div>

                <div className="market-price">
                  {bitcoin ? formatPrice(bitcoin.last) : '—'}
                </div>

                <div className="market-change">
                  {bitcoin && (
                    <>
                      {bitcoin.changePct >= 0 ? '▲' : '▼'}{' '}
                      <span className={bitcoin.changePct >= 0 ? 'positive' : 'negative'}>
                        {bitcoin.changePct >= 0 ? '+' : ''}{bitcoin.changePct.toFixed(2)}%
                      </span>{' '}
                      <span>24h</span>
                    </>
                  )}
                </div>
              </div>

              <div className="market-stats">
                <div className="market-stat">
                  <span>MARKET CAP</span>
                  <strong>$2.26T</strong>
                </div>

                <div className="market-stat">
                  <span>24H VOLUME</span>
                  <strong>$48.31B</strong>
                </div>

                <div className="market-stat">
                  <span>24H HIGH</span>
                  <strong>$115,321.18</strong>
                </div>

                <div className="market-stat">
                  <span>24H LOW</span>
                  <strong>$111,842.00</strong>
                </div>
              </div>
            </div>

            <MarketChart />

            {/* Render the MarketChart component */}
            <nav className="timeframes" aria-label="Chart timeframe">
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

          <aside className="trending-sidebar">
            <p className="trending-title">TRENDING</p>

            <div className="trending-list">

              <div className="trending-row">
                <div className="trending-icon link">↗</div>

                <div className="trending-info">
                  <strong>LINK</strong>
                  <span>Chainlink</span>
                </div>

                <span className="positive">+6.44%</span>
              </div>

              <div className="trending-row">
                <div className="trending-icon doge">Ð</div>

                <div className="trending-info">
                  <strong>DOGE</strong>
                  <span>Dogecoin</span>
                </div>

                <span className="positive">+5.12%</span>
              </div>

              <div className="trending-row">
                <div className="trending-icon avax">A</div>

                <div className="trending-info">
                  <strong>AVAX</strong>
                  <span>Avalanche</span>
                </div>

                <span className="positive">+4.31%</span>
              </div>

              <div className="trending-row">
                <div className="trending-icon xrp">X</div>

                <div className="trending-info">
                  <strong>XRP</strong>
                  <span>XRP</span>
                </div>

                <span className="positive">+3.21%</span>
              </div>

              <div className="trending-row">
                <div className="trending-icon btc">₿</div>

                <div className="trending-info">
                  <strong>BTC</strong>
                  <span>Bitcoin</span>
                </div>

                <span className="positive">+2.48%</span>
              </div>

            </div>
          </aside>

        </div>
      </main>
      </>
      )}
    </>
  )
}

export default App