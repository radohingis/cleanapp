// src/types/auth.types.ts
import type { User, Session } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export const Role = {
  Client: 'client',
  Supplier: 'supplier'
} as const;

export type Role = typeof Role[keyof typeof Role];

export interface AuthActions {
  initialize: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, role: Role) => Promise<void>
  signOut: () => Promise<void>
  signInWithProvider: (provider: 'google' | 'github' | 'gitlab') => Promise<void>
}

export type AuthStore = AuthState & AuthActions