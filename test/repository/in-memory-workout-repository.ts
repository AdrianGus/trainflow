import { PaginatedListRequest } from '@/domain/shared/repository/paginated-list-request'
import { PaginatedListResult } from '@/domain/shared/repository/paginated-list-result'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Workout } from '@/domain/workout/entity/workout'
import { WorkoutRepositoryInterface } from '@/domain/workout/repository/workout-repository-interface'

export class InMemoryWorkoutRepository implements WorkoutRepositoryInterface {
  public items: Workout[] = []

  async create(athlete: Workout): Promise<void> {
    this.items.push(athlete)
  }

  async update(athlete: Workout): Promise<void> {
    this.items.push(athlete)
  }

  async findOneById(id: string): Promise<Workout | null> {
    return this.items.find(athlete => athlete.id.equals(new UniqueEntityID(id))) ?? null
  }

  async findPaginatedList(paginator: PaginatedListRequest): Promise<PaginatedListResult<Workout>> {
    const athletes = this.items.slice(
      (paginator.getPage() - 1) * paginator.getSize(),
      paginator.getPage() * paginator.getSize()
    )

    return new PaginatedListResult(athletes, this.items.length)
  }

  async delete(athlete: Workout) {
    const itemIndex = this.items.findIndex(item => item.id === athlete.id)

    this.items.splice(itemIndex, 1)
  }
}
