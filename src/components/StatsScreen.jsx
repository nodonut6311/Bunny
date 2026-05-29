import { useHabits } from '../hooks/useHabits'
import { useUser } from '../hooks/useUser'
import '../styles/home.css'
import '../styles/stats.css'
import { BottomNav } from './BottomNav'
import { StatsCard } from './StatsCard'

export function StatsScreen({ activeScreen, setActiveScreen }) {
  const { userName } = useUser()
  const { habits } = useHabits()

  return (
    <div className="app-shell stats-screen">
      <header className="app-shell__header">
        <h1 className="app-shell__greeting">Welcome, {userName}</h1>
      </header>

      <main className="app-shell__main" aria-label="Stats content">
        {habits.length === 0 ? (
          <div className="stats-empty">
            <p>No habits yet. Add one to see stats!</p>
          </div>
        ) : (
          <div className="stats-list">
            {habits.map((habit) => (
              <StatsCard key={habit.id} habit={habit} />
            ))}
          </div>
        )}
      </main>

      <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
    </div>
  )
}
