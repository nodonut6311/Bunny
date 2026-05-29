import { useEffect, useRef, useState } from 'react'
import '../styles/modal.css'

export const HABIT_COLORS = [
  '#ff8c3a',
  '#ffa85c',
  '#ff6b6b',
  '#ee5a6f',
  '#c44569',
  '#4ecdc4',
  '#44a08d',
  '#95e1d3',
  '#a8e6cf',
  '#ffd3b6',
]

export function AddHabitModal({ isOpen, onClose, onSave }) {
  const [habitName, setHabitName] = useState('')
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0])
  const inputRef = useRef(null)

  const isValid = habitName.trim().length > 0 && selectedColor

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    setHabitName('')
    setSelectedColor(HABIT_COLORS[0])
    inputRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleSave = () => {
    const trimmed = habitName.trim()
    if (!trimmed || !selectedColor) {
      return
    }

    onSave(trimmed, selectedColor)
    onClose()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleSave()
  }

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-habit-title"
      >
        <h2 id="add-habit-title" className="modal__title">
          Add New Habit
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="modal__input"
            placeholder="Habit name"
            value={habitName}
            onChange={(event) => setHabitName(event.target.value)}
            aria-label="Habit name"
          />

          <span className="modal__color-label">Choose Color</span>
          <div className="modal__color-grid" role="listbox" aria-label="Habit color">
            {HABIT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                role="option"
                aria-selected={selectedColor === color}
                className={`modal__color-dot ${
                  selectedColor === color ? 'modal__color-dot--selected' : ''
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="modal__button modal__button--cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal__button modal__button--save"
              disabled={!isValid}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
