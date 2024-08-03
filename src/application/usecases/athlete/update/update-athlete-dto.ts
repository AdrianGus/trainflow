export type UpdateAthleteInputDto = {
  id: string
  name: string
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
