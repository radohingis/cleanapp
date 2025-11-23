// src/store/authStore.ts
import { create } from 'zustand'
import supabase from '@/utils/supabase'
import type { AuthStore, Role } from '../types/auth.types'
import { AuthError, type Session } from '@supabase/supabase-js'

async function getUserRoleFromSession(session: Session | null): Promise<Role | null> {
  const { data, error } = await supabase.from('profiles').select('role').eq('user_id', session?.user.id).single();
  if(error) {
    throw error;
  }

  return (data.role as Role) || null;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  role: null,
  session: null,
  loading: true,

  initialize: async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) throw error

      const role = await getUserRoleFromSession(session);

      set({ 
        session, 
        user: session?.user ?? null,
        role: role ?? null,
        loading: false 
      })

      supabase.auth.onAuthStateChange((_event, session) => {
        set({ 
          session, 
          user: session?.user ?? null
        })
      })
    } catch (error) {
      console.error('Error initializing auth:', error)
      set({ loading: false })
    }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error

    const role = await getUserRoleFromSession(data.session);
    
    set({ 
      session: data.session, 
      user: data.user,
      role: role ?? null
    })
  },

  signUp: async (email: string, password: string, role: Role) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }
      }
    })
    
    if (error) throw error

    if(data?.user?.identities?.length === 0) {
      throw new AuthError('An account with this email already exists. Please sign in instead.', 409, 'user_already_exists')
    }
    
    set({ 
      session: data.session, 
      user: data.user 
    })
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) throw error
    
    set({ 
      user: null, 
      session: null 
    })
  },

  signInWithProvider: async (provider: 'google' | 'github' | 'gitlab') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        
      },
    })
    
    if (error) throw error
  },
}))

export default useAuthStore