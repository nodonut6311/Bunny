import { useState } from 'react'
import { useHabits } from '../hooks/useHabits'
import { getLast98Days } from '../utils/dateUtils'
import '../styles/home.css'
import { AddHabitModal } from './AddHabitModal'
import { BottomNav } from './BottomNav'
import { HabitCard } from './HabitCard'

export function HomeScreen({ userName, activeScreen, setActiveScreen }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const {
    habits,
    setHabits,
    addHabit,
    deleteHabit,
    toggleHabitCompletion,
    isHabitCompletedToday,
  } = useHabits()

  const handleAddHabit = (name, color) => {
    addHabit(name, color)
  }

  const loadTestData = () => {
    const days = getLast98Days()
    setHabits([
      {
        id: 'test-1',
        name: 'Exercise',
        color: '#ff8c3a',
        createdDate: '2025-01-01',
        completionDates: [
          days[97],
          days[96],
          days[95],
          days[94],
          days[93],
          days[92],
          days[91],
          days[89],
          days[87],
        ],
      },
    ])
  }

  return (
    <div className="app-shell home-screen">
      <header className="app-shell__header">
        <h1 className="app-shell__greeting">Welcome, {userName}</h1>
        <button
          type="button"
          className="app-shell__fab"
          onClick={() => setIsAddModalOpen(true)}
          aria-label="Add habit"
        >
          +
        </button>
      </header>

      <main className="app-shell__main" aria-label="Habits content">
        {habits.length === 0 ? (
          <div className="habits-empty">
            <p>No habits yet. Tap + to get started!</p>
            {import.meta.env.DEV && (
              <button
                type="button"
                className="habits-empty__dev-btn"
                onClick={loadTestData}
              >
                Load test data
              </button>
            )}
          </div>
        ) : (
          <div className="habits-list">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompletedToday={isHabitCompletedToday(habit.id)}
                onToggleCompletion={toggleHabitCompletion}
                onDeleteHabit={deleteHabit}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddHabit}
      />
    </div>
  )
}
