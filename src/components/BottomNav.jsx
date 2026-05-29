import '../styles/bottom-nav.css'

export function BottomNav({ activeScreen, setActiveScreen }) {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav__container">
        <button
          type="button"
          className={`bottom-nav__button ${
            activeScreen === 'home' ? 'bottom-nav__button--active' : ''
          }`}
          onClick={() => setActiveScreen('home')}
          aria-current={activeScreen === 'home' ? 'page' : undefined}
        >
          Home
        </button>
        <button
          type="button"
          className={`bottom-nav__button ${
            activeScreen === 'stats' ? 'bottom-nav__button--active' : ''
          }`}
          onClick={() => setActiveScreen('stats')}
          aria-current={activeScreen === 'stats' ? 'page' : undefined}
        >
          Stats
        </button>
      </div>
    </nav>
  )
}
