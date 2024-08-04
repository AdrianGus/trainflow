import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { PaginatedListRequest } from '@/domain/shared/repository/paginated-list-request'
import { PaginatedListResult } from '@/domain/shared/repository/paginated-list-result'
import { Athlete } from '@/domain/athlete/entity/athlete'
import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'

export class FindPaginatedAthleteListUseCase
  implements UseCaseInterface<PaginatedListRequest, PaginatedListResult<Athlete>>
{
  constructor(private readonly athleteRepository: AthleteRepositoryInterface) {}

  async execute(paginator: PaginatedListRequest): Promise<PaginatedListResult<Athlete>> {
    return this.athleteRepository.findPaginatedList(paginator)
  }
}
