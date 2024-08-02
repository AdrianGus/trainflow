import * as z from 'zod'
import { registerUserSchema } from './register-use-schema'

export type RegisterUserInputDto = z.infer<typeof registerUserSchema>

export type RegisterUserOutputDto = {
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
