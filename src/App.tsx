
import Header from './components/header/Header'
import useAuthStore from './stores/auth.store'
import { useEffect } from 'react'

function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <>
      <Header />
    </>
  )
}

export default App
