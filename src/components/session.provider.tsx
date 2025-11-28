import { useEffect, type ReactNode } from 'react'
import useAuthStore from '@/stores/auth.store'

interface SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  const { initialize } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return <>{children}</>
}