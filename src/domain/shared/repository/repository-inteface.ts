import { PaginatedListRequest } from './paginated-list-request'
import { PaginatedListResult } from './paginated-list-result'

export interface RepositoryInterface<Entity> {
  create(entity: Entity): Promise<any>
  update(entity: Entity): Promise<any>
  delete(entity: Entity): Promise<any>
  findOneById(id: string): Promise<Entity | null>
  findPaginatedList(paginator: PaginatedListRequest): Promise<PaginatedListResult<Entity>>
}
