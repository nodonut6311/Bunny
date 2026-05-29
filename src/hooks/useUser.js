import { useLocalStorage } from './useLocalStorage'

export function useUser() {
  const [userName, setUserName] = useLocalStorage('bunny_user_name', '')
  const isFirstTime = !userName || userName.trim() === ''

  return { userName, setUserName, isFirstTime }
}
