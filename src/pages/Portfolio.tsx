//creating portfolio page with a summary of the user's portfolio and a list of their holdings
function Portfolio() {
  return (
    <main className="portfolio-page">
      <section className="portfolio-header">
        <div>
          <p className="portfolio-label">MY PORTFOLIO</p>
          <h1>Portfolio</h1>
        </div>
      </section>

      <section className="portfolio-summary">
        <div className="portfolio-card">
          <span>Total Balance</span>
          <strong>$24,582.41</strong>
        </div>

        <div className="portfolio-card">
          <span>24H Change</span>
          <strong className="positive">+$482.16</strong>
        </div>

        <div className="portfolio-card">
          <span>24H Change %</span>
          <strong className="positive">+2.48%</strong>
        </div>
      </section>

      <section className="portfolio-holdings">
        <div className="portfolio-section-header">
          <h2>Holdings</h2>
        </div>

        <div className="portfolio-table">
          <div className="portfolio-row portfolio-row-header">
            <span>ASSET</span>
            <span>PRICE</span>
            <span>HOLDINGS</span>
            <span>VALUE</span>
          </div>

          <div className="portfolio-row">
            <div className="portfolio-asset">
              <div className="asset-icon btc">₿</div>
              <div>
                <strong>BTC</strong>
                <span>Bitcoin</span>
              </div>
            </div>

            <span>$114,523.42</span>
            <span>0.125 BTC</span>
            <strong>$14,315.43</strong>
          </div>

          <div className="portfolio-row">
            <div className="portfolio-asset">
              <div className="asset-icon eth">◆</div>
              <div>
                <strong>ETH</strong>
                <span>Ethereum</span>
              </div>
            </div>

            <span>$4,322.18</span>
            <span>1.82 ETH</span>
            <strong>$7,866.37</strong>
          </div>

          <div className="portfolio-row">
            <div className="portfolio-asset">
              <div className="asset-icon sol">≋</div>
              <div>
                <strong>SOL</strong>
                <span>Solana</span>
              </div>
            </div>

            <span>$193.24</span>
            <span>8.42 SOL</span>
            <strong>$1,627.08</strong>
          </div>

          <div className="portfolio-row">
            <div className="portfolio-asset">
              <div className="asset-icon doge">Ð</div>
              <div>
                <strong>DOGE</strong>
                <span>Dogecoin</span>
              </div>
            </div>

            <span>$0.181</span>
            <span>4,000 DOGE</span>
            <strong>$724.00</strong>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Portfolio