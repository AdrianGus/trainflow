import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'
import { FindOneAthleteByIdOutputDto } from './find-one-athlete-by-id-dto'

export class FindOneAthleteByIdUseCase
  implements UseCaseInterface<string, FindOneAthleteByIdOutputDto>
{
  constructor(private readonly athleteRepository: AthleteRepositoryInterface) {}

  async execute(id: string): Promise<FindOneAthleteByIdOutputDto> {
    const athlete = await this.athleteRepository.findOneById(id)

    if (!athlete) throw new Error('Athlete not found')

    return {
      id: athlete.id.toString(),
      name: athlete.name,
      email: athlete.email.value,
      phone: athlete.phone.toString(),
      address: {
        zipCode: athlete.address.zipCode,
        street: athlete.address.street,
        number: athlete.address.number,
        district: athlete.address.district,
        city: athlete.address.city,
        state: athlete.address.state,
        complement: athlete.address.complement
      }
    }
  }
}
