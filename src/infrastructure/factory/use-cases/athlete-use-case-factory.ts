import { RepositoryFactory } from '../repository-factory'
import { RegisterAthleteUseCase } from '@/application/usecases/athlete/register/register-athlete-use-case'
import { LoginAthleteUseCase } from '@/application/usecases/athlete/login/login-athlete-use-case'
import { FindOneAthleteByIdUseCase } from '@/application/usecases/athlete/find-one-by-id/find-one-athlete-by-id-use-case'

export class AthleteUseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  buildRegister() {
    return new RegisterAthleteUseCase(this.repositoryFactory.buildAthlete())
  }

  buildLogin() {
    return new LoginAthleteUseCase(this.repositoryFactory.buildAthlete())
  }

  buildFindOneById() {
    return new FindOneAthleteByIdUseCase(this.repositoryFactory.buildAthlete())
  }
}
