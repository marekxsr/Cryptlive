import { useState } from 'react'
import MarketChart from './components/MarketChart'
import Header from "./components/Header"; // Import the Header component


function App() {
  const [view, setView] = useState<'market' | 'portfolio'>('market')// State to manage the current view

  return (
    <>
      <Header view={view} onViewChange={setView} />

      {/* Pass the current view and the function to change it as props to the Header component */}
      <main className="market-page">
        <div className="dashboard-layout">

          <aside className="assets-sidebar">
            <p className="assets-title">ALL ASSETS</p>

            <div className="asset-list">
              <div className="asset-row active">
                <div className="asset-icon btc">₿</div>
                <div className="asset-info">
                  <strong>BTC</strong>
                  <span>Bitcoin</span>
                </div>
                <div className="asset-price">
                  <strong>$114,523.42</strong>
                  <span className="positive">+2.48%</span>
                </div>
                <button className="star" type="button" aria-label="Favorite BTC">★</button>
              </div>

              <div className="asset-row">
                <div className="asset-icon eth">◆</div>
                <div className="asset-info">
                  <strong>ETH</strong>
                  <span>Ethereum</span>
                </div>
                <div className="asset-price">
                  <strong>$4,322.18</strong>
                  <span className="positive">+1.71%</span>
                </div>
                <button className="star" type="button" aria-label="Favorite ETH">★</button>
              </div>

              <div className="asset-row">
                <div className="asset-icon sol">≋</div>
                <div className="asset-info">
                  <strong>SOL</strong>
                  <span>Solana</span>
                </div>
                <div className="asset-price">
                  <strong>$193.24</strong>
                  <span className="negative">-0.42%</span>
                </div>
                <button className="star" type="button" aria-label="Favorite SOL">★</button>
              </div>

              <div className="asset-row">
                <div className="asset-icon xrp">X</div>
                <div className="asset-info">
                  <strong>XRP</strong>
                  <span>XRP</span>
                </div>
                <div className="asset-price">
                  <strong>$0.63</strong>
                  <span className="positive">+3.21%</span>
                </div>
                <button className="star" type="button" aria-label="Favorite XRP">★</button>
              </div>

              <div className="asset-row">
                <div className="asset-icon bnb">◆</div>
                <div className="asset-info">
                  <strong>BNB</strong>
                  <span>BNB</span>
                </div>
                <div className="asset-price">
                  <strong>$726.11</strong>
                  <span className="positive">+0.84%</span>
                </div>
                <button className="star" type="button" aria-label="Favorite BNB">★</button>
              </div>

              <div className="asset-row">
                <div className="asset-icon doge">Ð</div>
                <div className="asset-info">
                  <strong>DOGE</strong>
                  <span>Dogecoin</span>
                </div>
                <div className="asset-price">
                  <strong>$0.181</strong>
                  <span className="positive">+5.12%</span>
                </div>
                <button className="star" type="button" aria-label="Favorite DOGE">★</button>
              </div>

              <div className="asset-row">
                <div className="asset-icon ada">✣</div>
                <div className="asset-info">
                  <strong>ADA</strong>
                  <span>Cardano</span>
                </div>
                <div className="asset-price">
                  <strong>$0.52</strong>
                  <span className="negative">-1.23%</span>
                </div>
                <button className="star" type="button" aria-label="Favorite ADA">★</button>
              </div>

              <div className="asset-row">
                <div className="asset-icon avax">A</div>
                <div className="asset-info">
                  <strong>AVAX</strong>
                  <span>Avalanche</span>
                </div>
                <div className="asset-price">
                  <strong>$37.21</strong>
                  <span className="positive">+4.31%</span>
                </div>
                <button className="star" type="button" aria-label="Favorite AVAX">★</button>
              </div>
            </div>
          </aside>

          <section className="chart-section">

            {/* Chart section */}
            <div className="market-info">
              <div className="market-main">
                <div className="market-name">Bitcoin / USD</div>

                <div className="market-price">$114,523.42</div>

                <div className="market-change">
                  ▲ 2.48% <span>24h</span>
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
  )
}

export default App