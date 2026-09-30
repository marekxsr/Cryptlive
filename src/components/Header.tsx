type HeaderProps = {
  view: "market" | "portfolio";
  onViewChange: (view: "market" | "portfolio") => void;
};

export default function Header({
  view,
  onViewChange,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-logo">
        Cryptlive
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <button
          type="button"
          className={`nav-tab ${view === "market" ? "active" : ""}`}
          onClick={() => onViewChange("market")}
        >
          Market
        </button>

        <button
          type="button"
          className={`nav-tab ${
            view === "portfolio" ? "active" : ""
          }`}
          onClick={() => onViewChange("portfolio")}
        >
          My Portfolio
        </button>
      </nav>

      <div className="header-search">
        <input
          type="search"
          placeholder="Search coins..."
          aria-label="Search coins"
        />
      </div>

      <button
        type="button"
        className="profile-button"
        aria-label="Profile"
      >
        A
      </button>
    </header>
  );
}