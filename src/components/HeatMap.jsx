import '../styles/heatmap.css'
import { formatDate, getLast98Days, getTodayString } from '../utils/dateUtils'

const GRID_ROWS = 7
const GRID_COLS = 14

/** Order dates for CSS row-major grid: columns = weeks, rows = days (top to bottom). */
function orderDatesForWeekColumns(dates) {
  const ordered = []

  for (let row = 0; row < GRID_ROWS; row += 1) {
    for (let col = 0; col < GRID_COLS; col += 1) {
      ordered.push(dates[col * GRID_ROWS + row])
    }
  }

  return ordered
}

export function HeatMap({ habit }) {
  const dates = orderDatesForWeekColumns(getLast98Days())
  const today = getTodayString()
  const completionSet = new Set(habit.completionDates ?? [])

  return (
    <div
      className="heatmap"
      style={{
        '--tooltip-border-color': habit.color,
        '--tooltip-text-color': habit.color,
      }}
    >
      <div
        className="heatmap__grid"
        role="grid"
        aria-label={`${habit.name} completion heat map`}
      >
        {dates.map((date) => {
          const isCompleted = completionSet.has(date)
          const backgroundColor = isCompleted
            ? habit.color
            : 'var(--color-secondary-dark-blue)'

          return (
            <div key={date} className="heatmap__cell-wrapper" role="gridcell">
              <div
                className="heatmap__cell"
                style={{ backgroundColor }}
                aria-label={`${formatDate(date)}: ${isCompleted ? 'completed' : 'not completed'}${date === today ? ' (today)' : ''}`}
              />
              <span className="heatmap__tooltip">{formatDate(date)}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
