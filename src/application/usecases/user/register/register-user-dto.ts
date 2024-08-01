export type RegisterUserInputDto = {
  name: string
  email: string
  password: string
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
}
