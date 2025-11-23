"use client"
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { FieldError } from '@/components/ui/field'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useAuthStore from '@/stores/auth.store'
import type { Role } from '@/types/auth.types'
import { AuthError } from '@supabase/supabase-js'

function SignUpForm({ onSwitchToSignIn, onSubmitError }: { onSwitchToSignIn?: () => void, onSubmitError?: (error: AuthError | null) => void }) {
  const [role, setRole] = useState<Role>('supplier');

  const authStore = useAuthStore()

  const form = useForm({
    defaultValues: { 
      email: '', 
      password: '',
      repeatPassword: ''
    },
    onSubmit: async ({ value }) => {
      try {
        await authStore.signUp(value.email, value.password, role);
        await authStore.signIn(value.email, value.password);
        onSubmitError?.(null);
      } catch (error) {
        onSubmitError?.(error as AuthError);
      }
    }
  })

  return (
    <>
      <Tabs defaultValue={role}>
        <TabsList>
          <TabsTrigger
            value="client"
            onClick={() => setRole('client')}
          >
            Client
          </TabsTrigger>
          <TabsTrigger
            value="supplier"
            onClick={() => setRole('supplier')}
          >
            Supplier
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <form
        onSubmit={e => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="flex flex-col gap-4 w-full"
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value.includes('@')) {
                return 'Invalid email address'
              }
            },
            onChangeAsyncDebounceMs: 500
          }}
          children={(field) => {
            return (
              <>
                <Label>Email</Label>
                <Input
                  id={field.name}
                  type="email"
                  placeholder="Enter your email"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                />
                {
                  field.state.meta.errors.map((err, i) => (
                    <FieldError key={i}>{err}</FieldError>
                  ))
                }
              </>
            )
          }}
        />
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              if (value.length < 6) {
                return 'Password must be at least 6 characters long'
              }
            },
            onChangeAsyncDebounceMs: 500
          }}
          children={(field) => {
            return (
              <>
                <Label>Password</Label>
                <Input
                  id={field.name}
                  type="password"
                  placeholder="Enter your password"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                />
                {
                  field.state.meta.errors.map((err, i) => (
                    <FieldError key={i}>{err}</FieldError>
                  ))
                }
              </>
            )
          }}
        />
        <form.Field
          name="repeatPassword"
          validators={{
            onChange: ({ value }) => {
              if (value !== form.getFieldValue('password')) {
                return 'Passwords do not match'
              }
            },
            onChangeAsyncDebounceMs: 500
          }}
          children={(field) => {
            return (
              <>
                <Label>Repeat Password</Label>
                <Input
                  id={field.name}
                  type="password"
                  placeholder="Repeat your password"
                  value={field.state.value}
                  onChange={e => field.handleChange(e.target.value)}
                />
                {
                  field.state.meta.errors.map((err, i) => (
                    <FieldError key={i}>{err}</FieldError>
                  ))
                }
              </>
            )
          }}
        />
        
        <div className="flex items-center gap-x-2">
          {onSwitchToSignIn && <p className="text-muted-foreground text-sm">Already have an account? <Button variant="link" className="p-0" onClick={onSwitchToSignIn}>Sign In</Button></p>}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting} className="ml-auto">
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </Button>
            )}
          />
        </div>
      </form>
    </>
  )
}

export default SignUpForm;