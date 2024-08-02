import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { LoginUserInputDto, LoginUserOutputDto } from './login-user-dto'
import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'
import { BadRequestError, NotFoundError } from '@/infrastructure/http/util/api-errors'
import * as jwtService from 'jsonwebtoken'
var bcrypt = require('bcryptjs')

export class LoginUserUseCase implements UseCaseInterface<LoginUserInputDto, LoginUserOutputDto> {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async execute(input: LoginUserInputDto): Promise<LoginUserOutputDto> {
    const user = await this.userRepository.findOneByEmail(input.email)

    if (!user) throw new NotFoundError('User not found')

    const passwordMatch = await bcrypt.compare(input.password, user.password)

    if (!passwordMatch) throw new BadRequestError('Invalid credentials')

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
