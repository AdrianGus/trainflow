import * as z from 'zod'
import { registerAthleteSchema } from './register-athlete-schema'

export type RegisterAthleteInputDto = z.infer<typeof registerAthleteSchema>

export type RegisterAthleteOutputDto = {
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
