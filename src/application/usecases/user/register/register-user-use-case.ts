import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { RegisterUserInputDto, RegisterUserOutputDto } from './register-user-dto'
import { User } from '@/domain/user/entity/user'
import { Email } from '@/domain/user/value-object/email'
import { Phone } from '@/domain/user/value-object/phone'
import { Address } from '@/domain/user/value-object/address'
import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'
import { AlreadyExistsError } from '@/infrastructure/http/util/api-errors'
import * as jwtService from 'jsonwebtoken'
var bcrypt = require('bcryptjs')

export class RegisterUserUseCase
  implements UseCaseInterface<RegisterUserInputDto, RegisterUserOutputDto>
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async execute(input: RegisterUserInputDto): Promise<RegisterUserOutputDto> {
    if (await this.userRepository.findOneByEmail(input.email))
      throw new AlreadyExistsError('User already exists')

    const passwordHash = await bcrypt.hash(input.password, 10)

    const user = User.create({
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

    await this.userRepository.create(user)

    const jwt = jwtService.sign({ id: user.id.toString() }, process.env.JWT_SECRET!, {
      algorithm: 'HS256'
    })

    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email.value,
      phone: user.phone.toString(),
      address: {
        zipCode: user.address.zipCode,
        street: user.address.street,
        number: user.address.number,
        district: user.address.district,
        city: user.address.city,
        state: user.address.state,
        complement: user.address.complement
      },
      jwt
    }
  }
}
