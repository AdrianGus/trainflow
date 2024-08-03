import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { Athlete } from '@/domain/athlete/entity/athlete'
import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'
import { UpdateAthleteInputDto } from './update-athlete-dto'
import { Phone } from '@/domain/athlete/value-object/phone'
import { Address } from '@/domain/athlete/value-object/address'

export class UpdateAthleteUseCase implements UseCaseInterface<UpdateAthleteInputDto, Athlete> {
  constructor(private readonly athleteRepository: AthleteRepositoryInterface) {}

  async execute(input: UpdateAthleteInputDto): Promise<Athlete> {
    const athlete = await this.athleteRepository.findOneById(input.id)

    if (!athlete) throw new Error('Athlete not found')

    if (input.name) athlete.name = input.name

    if (input.phone) athlete.phone = Phone.createFromString(input.phone)

    if (input.address)
      athlete.address = Address.create({
        zipCode: input.address.zipCode,
        street: input.address.street,
        number: input.address.number,
        district: input.address.district,
        city: input.address.city,
        state: input.address.state,
        complement: input.address.complement
      })

    await this.athleteRepository.update(athlete)

    return athlete
  }
}
