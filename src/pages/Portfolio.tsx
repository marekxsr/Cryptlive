  //creating portfolio page with a summary of the user's portfolio and a list of their holdings
  import { portfolioHoldings } from '../data/portfolio'
  const totalBalance = portfolioHoldings.reduce((total, holding) => {
    return total + Number(holding.value.replace(/[$,]/g, ''))
  }, 0)
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
            <strong>${totalBalance.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </strong>
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

            {portfolioHoldings.map((holding) => (
              <div className="portfolio-row" key={holding.symbol}>
                <div className="portfolio-asset">
                  <div className={`asset-icon ${holding.iconClass}`}>
                    {holding.icon}
                  </div>

                  <div>
                    <strong>{holding.symbol}</strong>
                    <span>{holding.name}</span>
                  </div>
                </div>

                <span>{holding.price}</span>
                <span>{holding.amount}</span>
                <strong>{holding.value}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>
    )
  }

  export default Portfolio