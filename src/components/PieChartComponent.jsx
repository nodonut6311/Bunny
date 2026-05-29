import { Cell, Pie, PieChart } from 'recharts'
import '../styles/stats.css'

const CHART_SIZE = 200
const RING_THICKNESS = 8
const OUTER_RADIUS = CHART_SIZE / 2 - 4
const INNER_RADIUS = OUTER_RADIUS - RING_THICKNESS

export function PieChartComponent({ habitColor, rating, percentage }) {
  const completedValue = Math.min(100, Math.max(0, percentage))
  const remainingValue = 100 - completedValue

  let data
  let colors

  if (completedValue === 0) {
    data = [{ name: 'remaining', value: 100 }]
    colors = ['var(--color-primary-dark-blue)']
  } else if (completedValue === 100) {
    data = [{ name: 'completed', value: 100 }]
    colors = [habitColor]
  } else {
    data = [
      { name: 'completed', value: completedValue },
      { name: 'remaining', value: remainingValue },
    ]
    colors = [habitColor, 'var(--color-primary-dark-blue)']
  }

  return (
    <div className="pie-chart">
      <PieChart width={CHART_SIZE} height={CHART_SIZE}>
        <Pie
          data={data}
          cx={CHART_SIZE / 2}
          cy={CHART_SIZE / 2}
          innerRadius={INNER_RADIUS}
          outerRadius={OUTER_RADIUS}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
          isAnimationActive
          animationDuration={400}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
      <div className="pie-chart__center">
        <span className="pie-chart__rating" style={{ color: habitColor }}>
          {rating}
        </span>
        <span className="pie-chart__label">Completion</span>
      </div>
    </div>
  )
}
