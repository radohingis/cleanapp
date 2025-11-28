import type AddJobForm from "@/components/client/add-job/AddJobForm"
import { getSchemaDefaults } from "@/utils/zod"
import { z } from "zod"

export const jobSchema = z.object({
  id: z.number(),
  created_at: z.number(),
  updated_at: z.number(),
  client: z.uuid().default(''),
  supplier: z.uuid().nullable(),
  title: z.string().min(1, { message: 'Title is required' }).default(''),
  description: z.string().min(1, { message: 'Description is required' }).default(''),
  date_start: z.string().default(() => new Date().toISOString()),
  date_end: z.date().nullable(),
  price: z.number().nonnegative({ message: 'Price must be non-negative' }).nullable().default(null),
  preview_image_url: z.string().nullable(),
  address_line_1: z.string().default(''),
  address_line_2: z.string().nullable(),
  city: z.string().default(''),
  state: z.string().default(''),
  postal_code: z.string().default(''),
  country: z.string().default(''),
  gps_lat: z.number().nullable(),
  gps_lng: z.number().nullable(),
  location_timezone: z.string()
})

export const addJobSchema = jobSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  supplier: true,
  date_end: true,
  preview_image_url: true
})

type AddJobForm = z.infer<typeof addJobSchema>

export function createAddJobDefaultForm(defaults: { [key in keyof AddJobForm]?: AddJobForm[key] } = {}): AddJobForm {
  const form = getSchemaDefaults(addJobSchema)
  return {
    ...form,
    ...defaults
  }
}

export type Job = z.infer<typeof jobSchema>