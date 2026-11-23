//creating portfolio page with a summary of the user's portfolio and a list of their holdings
import type { MarketTicker } from '../types/market'

type PortfolioProps = {
  favorites: string[]
  marketData: MarketTicker[]
  onSelectAsset: (symbol: string) => void
  onRemoveFavorite: (symbol: string) => void
}

const assetDetails: Record<string, { name: string; icon: string; className: string }> = {
  'BTC/USD': { name: 'Bitcoin', icon: '₿', className: 'btc' },
  'ETH/USD': { name: 'Ethereum', icon: '◆', className: 'eth' },
  'SOL/USD': { name: 'Solana', icon: '≋', className: 'sol' },
  'XRP/USD': { name: 'XRP', icon: 'X', className: 'xrp' },
  'BNB/USD': { name: 'BNB', icon: '◆', className: 'bnb' },
  'DOGE/USD': { name: 'Dogecoin', icon: 'Ð', className: 'doge' },
  'ADA/USD': { name: 'Cardano', icon: '✣', className: 'ada' },
  'AVAX/USD': { name: 'Avalanche', icon: 'A', className: 'avax' },
  'LINK/USD': { name: 'Chainlink', icon: '⬡', className: 'link' },
}

// Format cryptocurrency prices consistently with the Market dashboard.
function formatPrice(price: number): string {
  return price < 1
    ? `$${price.toFixed(4)}`
    : `$${price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
}

function Portfolio({
  favorites,
  marketData,
  onSelectAsset,
  onRemoveFavorite,
}: PortfolioProps) {
  const favoriteAssets = favorites
    .map((symbol) => ({
      ticker: marketData.find((item) => item.symbol === symbol),
      details: assetDetails[symbol],
    }))
    .filter(
      (item): item is {
        ticker: MarketTicker
        details: { name: string; icon: string; className: string }
      } => Boolean(item.ticker && item.details),
    )

  const gainingAssets = favoriteAssets.filter(
    (item) => item.ticker.changePct > 0,
  ).length

  const fallingAssets = favoriteAssets.filter(
    (item) => item.ticker.changePct < 0,
  ).length

  // Calculate the average 24-hour price change across tracked assets.
const averageChange =
  favoriteAssets.length > 0
    ? favoriteAssets.reduce(
        (total, item) => total + item.ticker.changePct,
        0,
      ) / favoriteAssets.length
    : 0

  return (
    <main className="portfolio-page">
      <section className="portfolio-header">
        <div>
          <p className="portfolio-label">YOUR WATCHLIST</p>
          <h1>Watchlist</h1>
        </div>
      </section>

      <section className="portfolio-summary">
        <div className="portfolio-card">
          <span>Tracked Assets</span>
          <strong>{favoriteAssets.length}</strong>
        </div>

        <div className="portfolio-card">
  <span>Average Change · 24H</span>
  <strong className={averageChange >= 0 ? 'positive' : 'negative'}>
    {averageChange > 0 ? '+' : ''}
    {averageChange.toFixed(2)}%
  </strong>
</div>

        <div className="portfolio-card">
          <span>Gaining · 24H</span>
          <strong className="positive">{gainingAssets}</strong>
        </div>

        <div className="portfolio-card">
          <span>Falling · 24H</span>
          <strong className="negative">{fallingAssets}</strong>
        </div>
      </section>

      <section className="portfolio-holdings">
        <div className="portfolio-section-header">
          <h2>My Assets</h2>
        </div>

        <div className="portfolio-table">
          <div className="portfolio-row portfolio-row-header">
            <span>ASSET</span>
            <span>PRICE</span>
            <span>24H CHANGE</span>
            <span></span>
          </div>

          {favoriteAssets.map(({ ticker, details }) => {
            const isPositive = ticker.changePct >= 0
            const symbol = ticker.symbol.split('/')[0]

            return (
              <div className="portfolio-row" key={ticker.symbol}>
                <div
                  className="portfolio-asset"
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectAsset(ticker.symbol)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onSelectAsset(ticker.symbol)
                    }
                  }}
                >
                  <div className={`asset-icon ${details.className}`}>
                    {details.icon}
                  </div>
                  <div>
                    <strong>{symbol}</strong>
                    <span>{details.name}</span>
                  </div>
                </div>

                <span>{formatPrice(ticker.last)}</span>

                <span className={isPositive ? 'positive' : 'negative'}>
                  {isPositive ? '+' : ''}
                  {ticker.changePct.toFixed(2)}%
                </span>

                <button
                  className="portfolio-remove"
                  type="button"
                  aria-label={`Remove ${symbol} from Watchlist`}
                  onClick={() => onRemoveFavorite(ticker.symbol)}
                >
                  ×
                </button>
              </div>
            )
          })}

          {favoriteAssets.length === 0 && (
            <div className="portfolio-empty">
              <h3>Your Watchlist is empty</h3>
              <p>
                Add cryptocurrencies using the star button in the Market
                dashboard.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Portfolio
