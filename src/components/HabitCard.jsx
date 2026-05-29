import { useEffect, useRef, useState } from 'react'
import { getTodayString } from '../utils/dateUtils'
import '../styles/habit-card.css'
import { HeatMap } from './HeatMap'

const LONG_PRESS_MS = 500

export function HabitCard({
  habit,
  isCompletedToday,
  onToggleCompletion,
  onDeleteHabit,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const longPressTimerRef = useRef(null)
  const longPressTriggeredRef = useRef(false)

  useEffect(() => {
    return () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current)
      }
    }
  }, [])

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }
  }

  const handleToggle = () => {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false
      return
    }
    onToggleCompletion(habit.id, getTodayString())
  }

  const handlePressStart = (event) => {
    if (event.target.closest('.habit-card__check')) {
      return
    }
    if (showDeleteConfirm) {
      return
    }

    longPressTriggeredRef.current = false
    clearLongPressTimer()

    longPressTimerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true
      setShowDeleteConfirm(true)
    }, LONG_PRESS_MS)
  }

  const handlePressEnd = () => {
    clearLongPressTimer()
  }

  const handleDelete = () => {
    onDeleteHabit(habit.id)
    setShowDeleteConfirm(false)
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  const handleDeleteOverlayClick = () => {
    setShowDeleteConfirm(false)
  }

  return (
    <article
      className="habit-card"
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onTouchCancel={handlePressEnd}
    >
      {showDeleteConfirm && (
        <div
          className="habit-card__delete-overlay"
          onClick={handleDeleteOverlayClick}
          role="presentation"
        >
          <div
            className="habit-card__delete-menu"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-labelledby={`delete-habit-${habit.id}`}
          >
            <p
              id={`delete-habit-${habit.id}`}
              className="habit-card__delete-text"
            >
              Delete this habit?
            </p>
            <div className="habit-card__delete-actions">
              <button
                type="button"
                className="habit-card__delete-btn habit-card__delete-btn--cancel"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="habit-card__delete-btn habit-card__delete-btn--confirm"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="habit-card__header">
        <h2 className="habit-card__name">{habit.name}</h2>
        <button
          type="button"
          className={`habit-card__check ${
            isCompletedToday
              ? 'habit-card__check--checked'
              : 'habit-card__check--unchecked'
          }`}
          style={{ '--habit-color': habit.color }}
          onClick={handleToggle}
          onMouseDown={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          aria-pressed={isCompletedToday}
          aria-label={
            isCompletedToday
              ? `Mark ${habit.name} incomplete for today`
              : `Mark ${habit.name} complete for today`
          }
        >
          ✓
        </button>
      </header>
      <div className="habit-card__heatmap">
        <HeatMap habit={habit} />
      </div>
    </article>
  )
}
