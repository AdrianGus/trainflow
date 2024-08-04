import z from 'zod'

export const loginAthleteSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10)
})
