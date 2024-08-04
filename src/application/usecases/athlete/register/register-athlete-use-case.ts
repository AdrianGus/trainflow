import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { RegisterAthleteInputDto, RegisterAthleteOutputDto } from './register-athlete-dto'
import { Athlete } from '@/domain/athlete/entity/athlete'
import { Email } from '@/domain/athlete/value-object/email'
import { Phone } from '@/domain/athlete/value-object/phone'
import { Address } from '@/domain/athlete/value-object/address'
import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'
import { AlreadyExistsError } from '@/infrastructure/http/util/api-errors'
import * as jwtService from 'jsonwebtoken'
var bcrypt = require('bcryptjs')

export class RegisterAthleteUseCase
  implements UseCaseInterface<RegisterAthleteInputDto, RegisterAthleteOutputDto>
{
  constructor(private readonly athleteRepository: AthleteRepositoryInterface) {}

  public async execute(input: RegisterAthleteInputDto): Promise<RegisterAthleteOutputDto> {
    if (await this.athleteRepository.findOneByEmail(input.email))
      throw new AlreadyExistsError('Athlete already exists')

    const passwordHash = await bcrypt.hash(input.password, 10)

    const athlete = Athlete.create({
      name: input.name,
      email: Email.createFromString(input.email),
      password: passwordHash,
      phone: Phone.createFromString(input.phone),
      address: Address.create({
        zipCode: input.address.zipCode,
        street: input.address.street,
        number: input.address.number,
        district: input.address.district,
        city: input.address.city,
        state: input.address.state,
        complement: input.address.complement
      })
    })

    await this.athleteRepository.create(athlete)

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
