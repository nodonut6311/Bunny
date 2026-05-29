import { getCompletionPercentage, getLast30Days } from './dateUtils'

export function getCompletionDatesInLast30Days(completionDates) {
  const period = new Set(getLast30Days())
  return (completionDates ?? []).filter((date) => period.has(date))
}

function percentageToRating(percentage) {
  if (percentage <= 20) {
    return 1
  }
  if (percentage <= 40) {
    return 2
  }
  if (percentage <= 60) {
    return 3
  }
  if (percentage <= 80) {
    return 4
  }
  return 5
}

export function calculateCompletionRating(completionDates, days = 30) {
  const percentage = getCompletionPercentage(completionDates ?? [], days)
  const rating = percentageToRating(percentage)

  return { rating, percentage }
}
