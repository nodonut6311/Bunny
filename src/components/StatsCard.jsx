import { calculateCompletionRating } from '../utils/statsUtils'
import '../styles/stats.css'
import { PieChartComponent } from './PieChartComponent'

export function StatsCard({ habit }) {
  const { rating, percentage } = calculateCompletionRating(
    habit.completionDates,
    30,
  )

  return (
    <article className="stats-card">
      <h2 className="stats-card__name">{habit.name}</h2>
      <p className="stats-card__period">Last 30 days</p>
      <div className="stats-card__chart-wrap">
        <PieChartComponent
          habitColor={habit.color}
          rating={rating}
          percentage={percentage}
        />
      </div>
      <p className="stats-card__percentage">
        {percentage}% completed in last 30 days
      </p>
    </article>
  )
}
