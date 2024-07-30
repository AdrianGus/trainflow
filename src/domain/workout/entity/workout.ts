import { EntityWithId } from '@/domain/shared/entity-with-id'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'

type WorkoutProps = {
  name: string
  description: string
}

export class Workout extends EntityWithId<WorkoutProps> {
  static create(props: WorkoutProps, id?: UniqueEntityID): Workout {
    return new Workout(props, id)
  }
}
