import { PaginatedListRequest } from '@/domain/shared/repository/paginated-list-request'
import { PaginatedListResult } from '@/domain/shared/repository/paginated-list-result'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { User } from '@/domain/user/entity/user'
import { UserRepositoryInterface } from '@/domain/user/repository/user-repository-interface'

export class InMemoryUserRepository implements UserRepositoryInterface {
  public items: User[] = []

  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async update(user: User): Promise<void> {
    this.items.push(user)
  }

  async findOneById(id: string): Promise<User | null> {
    return this.items.find(user => user.id.equals(new UniqueEntityID(id))) ?? null
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.items.find(item => item.email.value === email) ?? null
  }

  async findPaginatedList(paginator: PaginatedListRequest): Promise<PaginatedListResult<User>> {
    const users = this.items.slice(
      (paginator.getPage() - 1) * paginator.getSize(),
      paginator.getPage() * paginator.getSize()
    )

    return new PaginatedListResult(users, this.items.length)
  }

  async delete(user: User) {
    const itemIndex = this.items.findIndex(item => item.id === user.id)

    this.items.splice(itemIndex, 1)
  }
}
