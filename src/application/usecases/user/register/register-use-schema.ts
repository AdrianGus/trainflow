import * as z from 'zod'

export const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(10),
  phone: z.string(),
  address: z.object({
    zipCode: z.string(),
    street: z.string(),
    number: z.number(),
    district: z.string(),
    city: z.string(),
    state: z.string(),
    complement: z.string().optional()
  })
})
