
import SignInForm from '@/components/auth/SignInForm'
import SignUpForm from '@/components/auth/SignUpForm'
import useAuthStore from './stores/auth.store'
import { useEffect } from 'react'

function App() {
  const { initialize, loading, user } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    return <div>Welcome, {user.email}!</div>
  }

  return (
    <>
      <SignUpForm />
      <SignInForm />
    </>
  )
}

export default App
