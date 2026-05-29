import { ScreenTransition } from './components/ScreenTransition'
import { useUser } from './hooks/useUser'

function App() {
  const { userName, setUserName } = useUser()

  return <ScreenTransition userName={userName} setUserName={setUserName} />
}

export default App
