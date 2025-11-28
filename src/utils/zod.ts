import z from 'zod'

export function getSchemaDefaults<T extends z.ZodObject<z.ZodRawShape>>(
  schema: T,
  initialData: Partial<z.infer<T>> = {},
): z.infer<T> {
  const defaultData: Record<string, unknown> = {}

  for (const key in schema.shape) {
    const field = schema.shape[key]

    if (field instanceof z.ZodDefault) {
      defaultData[key] = field.def.defaultValue
    }
    else {
      defaultData[key] = undefined
    }

    if (initialData[key] !== undefined) {
      defaultData[key] = initialData[key]
    }
  }

  return defaultData as z.infer<T>
}

export const validateField = <T extends z.ZodTypeAny>(schema: T, fieldName: string, value: unknown): string[] => {
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape
    const fieldSchema = shape[fieldName]
    
    if (fieldSchema) {
      try {
        fieldSchema.parse(value)
        return []
      } catch (error: unknown) {
        if (error instanceof z.ZodError) {
          return JSON.parse(error.message).map((err: { message: string }) => err.message)
        }
      }
    }
  }
  
  return []
}