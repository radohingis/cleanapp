"use client"
import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { FieldError } from '@/components/ui/field'
import useAuthStore from '@/stores/auth.store'
import { AuthError } from '@supabase/supabase-js'

function SignInForm({ onSwitchToSignUp, onSubmitError }: { onSwitchToSignUp?: () => void, onSubmitError?: (error: AuthError | null) => void }) {
  const authStore = useAuthStore()
  const form = useForm({
    defaultValues: {
      email: '', 
      password: '',
      repeatPassword: ''
    },
    onSubmit: async ({ value }) => {
      try {
        await authStore.signIn(value.email, value.password);
        onSubmitError?.(null)
      } catch (error: unknown) {
        onSubmitError?.(error as AuthError);
      }
    }
  })

  return (
    <>
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
        <div className="flex items-center gap-x-2">
          {onSwitchToSignUp && <p className="text-muted-foreground text-sm">Don't have an account? <Button variant="link" className="p-0" onClick={onSwitchToSignUp}>Sign Up</Button></p>}
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting} className="ml-auto">
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </Button>
            )}
          />
        </div>
      </form>
    </>
  )
}

export default SignInForm;