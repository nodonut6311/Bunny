import { useEffect, useRef, useState } from 'react'
import '../styles/welcome.css'

export function WelcomeScreen({ setUserName }) {
  const [name, setName] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleContinue = () => {
    const trimmed = name.trim()
    if (!trimmed) {
      return
    }
    setUserName(trimmed)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleContinue()
    }
  }

  const isValid = name.trim().length > 0

  return (
    <section className="welcome">
      <div className="welcome__content">
        <h1 className="welcome__title">Welcome to Bunny</h1>
        <p className="welcome__subtitle">What&apos;s your name?</p>
        <input
          ref={inputRef}
          type="text"
          className="welcome__input"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Your name"
        />
        <button
          type="button"
          className="welcome__button"
          onClick={handleContinue}
          disabled={!isValid}
        >
          Continue
        </button>
      </div>
    </section>
  )
}
