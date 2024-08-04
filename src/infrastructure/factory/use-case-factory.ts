import { RepositoryFactory } from './repository-factory'
import { AthleteUseCaseFactory } from './use-cases/athlete-use-case-factory'

export class UseCaseFactory {
  constructor(private readonly repositoryFactory: RepositoryFactory) {}

  buildAthlete() {
    return new AthleteUseCaseFactory(this.repositoryFactory)
  }
}
