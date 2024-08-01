import { UseCaseInterface } from '@/application/interface/use-case-interface'
import { PaginatedListRequest } from '@/domain/shared/repository/paginated-list-request'
import { PaginatedListResult } from '@/domain/shared/repository/paginated-list-result'
import { User } from '@/domain/user/entity/user'
import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'

export class FindPaginatedUserListUseCase
  implements UseCaseInterface<PaginatedListRequest, PaginatedListResult<User>>
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async execute(paginator: PaginatedListRequest): Promise<PaginatedListResult<User>> {
    return this.userRepository.findPaginatedList(paginator)
  }
}
