import { PaginatedListRequest } from '@/domain/shared/repository/paginated-list-request'
import { PaginatedListResult } from '@/domain/shared/repository/paginated-list-result'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Athlete } from '@/domain/athlete/entity/athlete'
import { AthleteRepositoryInterface } from '@/domain/athlete/repository/athlete-repository-interface'

export class InMemoryAthleteRepository implements AthleteRepositoryInterface {
  public items: Athlete[] = []

  async create(athlete: Athlete): Promise<void> {
    this.items.push(athlete)
  }

  async update(athlete: Athlete): Promise<void> {
    this.items.push(athlete)
  }

  async findOneById(id: string): Promise<Athlete | null> {
    return this.items.find(athlete => athlete.id.equals(new UniqueEntityID(id))) ?? null
  }

  async findOneByEmail(email: string): Promise<Athlete | null> {
    return this.items.find(item => item.email.value === email) ?? null
  }

  async findPaginatedList(paginator: PaginatedListRequest): Promise<PaginatedListResult<Athlete>> {
    const athletes = this.items.slice(
      (paginator.getPage() - 1) * paginator.getSize(),
      paginator.getPage() * paginator.getSize()
    )

    return new PaginatedListResult(athletes, this.items.length)
  }

  async delete(athlete: Athlete) {
    const itemIndex = this.items.findIndex(item => item.id === athlete.id)

    this.items.splice(itemIndex, 1)
  }
}
