"use client"
import supabase from '@/utils/supabase';
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { FieldError } from '@/components/ui/field'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

function SignUpForm() {
  const [role, setRole] = useState<'client' | 'supplier'>('client');
  const form = useForm({
    defaultValues: { 
      email: '', 
      password: '',
      repeatPassword: ''
    },
    onSubmit: async ({ value }) => {
      try {
        await supabase.auth.signUp({ 
          email: value.email, 
          password: value.password,
          options: {
            data: { role }
          }
        })
      } catch (error) {
        console.error('Error signing up:', error)
      }
    }
  })

  return <div className="mx-auto flex flex-col items-center p-8 gap-6 w-full max-w-sm shadow-lg shadow-muted rounded-xl">
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
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
        )}
      />
    </form>
  </div>
}

export default SignUpForm;