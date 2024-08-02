export type FindOneUserByIdOutputDto = {
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
}
