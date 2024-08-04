import z from 'zod'
import { loginAthleteSchema } from './login-athlete-schema'

export type LoginAthleteInputDto = z.infer<typeof loginAthleteSchema>

export type LoginAthleteOutputDto = {
  id: string
  name: string
  email: string
  phone: string
  address: {
    zipCode: string
    street: string
    number: number
    district: string
    city: string
    state: string
    complement?: string
  }
  jwt: string
}
