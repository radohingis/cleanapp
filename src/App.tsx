
import Header from './components/Header'
import { ThemeProvider } from './components/theme.provider'
import useAuthStore from './stores/auth.store'
import { useEffect } from 'react'

function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  )
}

export default App
