import { useCallback } from 'react'
import { getTodayString } from '../utils/dateUtils'
import { useLocalStorage } from './useLocalStorage'

function createHabitId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useHabits() {
  const [habits, setHabits] = useLocalStorage('bunny_habits', [])

  const addHabit = useCallback(
    (name, color) => {
      const newHabit = {
        id: createHabitId(),
        name,
        color,
        createdDate: getTodayString(),
        completionDates: [],
      }

      setHabits((prev) => [...prev, newHabit])
    },
    [setHabits],
  )

  const deleteHabit = useCallback(
    (id) => {
      setHabits((prev) => prev.filter((habit) => habit.id !== id))
    },
    [setHabits],
  )

  const toggleHabitCompletion = useCallback(
    (id, date) => {
      setHabits((prev) =>
        prev.map((habit) => {
          if (habit.id !== id) {
            return habit
          }

          const completionDates = habit.completionDates ?? []
          const isCompleted = completionDates.includes(date)

          return {
            ...habit,
            completionDates: isCompleted
              ? completionDates.filter((d) => d !== date)
              : [...completionDates, date],
          }
        }),
      )
    },
    [setHabits],
  )

  const getHabits = useCallback(() => habits, [habits])

  const isHabitCompletedToday = useCallback(
    (id) => {
      const habit = habits.find((h) => h.id === id)
      if (!habit) {
        return false
      }

      const today = getTodayString()
      return (habit.completionDates ?? []).includes(today)
    },
    [habits],
  )

  return {
    habits,
    setHabits,
    addHabit,
    deleteHabit,
    toggleHabitCompletion,
    getHabits,
    isHabitCompletedToday,
  }
}
