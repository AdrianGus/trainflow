import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { LoginAthleteInputDto, LoginAthleteOutputDto } from './login-athlete-dto'
import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'
import { BadRequestError, NotFoundError } from '@/infrastructure/http/util/api-errors'
import * as jwtService from 'jsonwebtoken'
var bcrypt = require('bcryptjs')

export class LoginAthleteUseCase
  implements UseCaseInterface<LoginAthleteInputDto, LoginAthleteOutputDto>
{
  constructor(private readonly athleteRepository: AthleteRepositoryInterface) {}

  public async execute(input: LoginAthleteInputDto): Promise<LoginAthleteOutputDto> {
    const athlete = await this.athleteRepository.findOneByEmail(input.email)

    if (!athlete) throw new NotFoundError('Athlete not found')

    const passwordMatch = await bcrypt.compare(input.password, athlete.password)

    if (!passwordMatch) throw new BadRequestError('Invalid credentials')

    const jwt = jwtService.sign({ id: athlete.id.toString() }, process.env.JWT_SECRET!, {
      algorithm: 'HS256'
    })

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
      },
      jwt
    }
  }
}
