import { useState } from 'react'
import '../styles/welcome.css'
import { HomeScreen } from './HomeScreen'
import { StatsScreen } from './StatsScreen'
import { WelcomeScreen } from './WelcomeScreen'

export function ScreenTransition({ userName, setUserName }) {
  const showWelcome = !userName?.trim()
  const [activeScreen, setActiveScreen] = useState('home')

  return (
    <div className="screen-transition">
      <div
        className={`screen-transition__panel ${
          showWelcome ? 'screen-transition__panel--active' : ''
        }`}
        aria-hidden={!showWelcome}
      >
        <WelcomeScreen setUserName={setUserName} />
      </div>

      <div
        className={`screen-transition__panel ${
          !showWelcome ? 'screen-transition__panel--active' : ''
        }`}
        aria-hidden={showWelcome}
      >
        {activeScreen === 'home' ? (
          <HomeScreen
            userName={userName}
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
          />
        ) : (
          <StatsScreen
            activeScreen={activeScreen}
            setActiveScreen={setActiveScreen}
          />
        )}
      </div>
    </div>
  )
}
