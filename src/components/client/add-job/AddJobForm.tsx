"use client"
import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { FieldError } from '@/components/ui/field'
import { createAddJobDefaultForm, addJobSchema } from '@/types/job.types'
import { validateField } from '@/utils/zod'
import { Textarea } from '@/components/ui/textarea'
import { DateTimeInput } from '@/components/ui/date-time-input'
import useAuthStore from '@/stores/auth.store'

function AddJobForm() {
  const { user } = useAuthStore()
  const form = useForm({
    defaultValues: createAddJobDefaultForm({ client: user?.id }),
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
      } catch (error: unknown) {
        console.log(error);
        
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
          name="title"
          validators={{
            onChange: ({ value }) => validateField(addJobSchema, 'title', value),
            onChangeAsyncDebounceMs: 500
          }}
          children={(field) => {
            return (
              <>
                <Label>Name</Label>
                <Input
                  id={field.name}
                  type="text"
                  placeholder="Enter the job title"
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
          name="description"
          validators={{
            onChange: ({ value }) => validateField(addJobSchema, 'description', value),
            onChangeAsyncDebounceMs: 500
          }}
          children={(field) => {
            return (
              <>
                <Label>Description</Label>
                <Textarea
                  id={field.name}
                  placeholder="Enter the job description"
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
          name="date_start"
          validators={{
            onChange: ({ value }) => validateField(addJobSchema, 'date_start', value)
          }}
          children={(field) => {
            return (
              <>
                <Label>Start Date</Label>
                <DateTimeInput 
                  model={field.state.value} 
                  dispatch={payload => field.handleChange(payload)}
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
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting} className="ml-auto">
                Publish
              </Button>
            )}
          />
        </div>
      </form>
    </>
  )
}

export default AddJobForm;