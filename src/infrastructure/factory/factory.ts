import { RepositoryFactory } from './repository-factory'
import { UseCaseFactory } from './use-case-factory'

export class Factory {
  private buildRepositoryFactory() {
    return new RepositoryFactory()
  }

  public buildUseCaseFactory() {
    return new UseCaseFactory(this.buildRepositoryFactory())
  }
}
