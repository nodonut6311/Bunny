import { useCallback, useState } from 'react'

function readStoredValue(key, initialValue) {
  if (typeof window === 'undefined') {
    return initialValue
  }

  try {
    const item = window.localStorage.getItem(key)
    if (item === null) {
      window.localStorage.setItem(key, JSON.stringify(initialValue))
      return initialValue
    }
    return JSON.parse(item)
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error)
    return initialValue
  }
}

export function useLocalStorage(key, initialValue) {
  const [value, setValueState] = useState(() => readStoredValue(key, initialValue))

  const setValue = useCallback(
    (nextValue) => {
      setValueState((prev) => {
        const valueToStore =
          typeof nextValue === 'function' ? nextValue(prev) : nextValue

        try {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
          console.warn(`Error writing localStorage key "${key}":`, error)
        }

        return valueToStore
      })
    },
    [key],
  )

  return [value, setValue]
}
