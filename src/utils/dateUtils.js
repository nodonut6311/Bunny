function toDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function getTodayString() {
  return toDateString(new Date())
}

export function getLastNDays(count) {
  const dates = []
  const today = new Date()

  for (let i = count - 1; i >= 0; i -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    dates.push(toDateString(date))
  }

  return dates
}

export function getLast30Days() {
  return getLastNDays(30)
}

export function getLast98Days() {
  return getLastNDays(98)
}

export function getCompletionPercentage(completionDates, days = 30) {
  if (days <= 0) {
    return 0
  }

  const period = getLastNDays(days)
  const completedCount = period.filter((date) =>
    completionDates.includes(date),
  ).length

  return Math.round((completedCount / days) * 100)
}

export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}
