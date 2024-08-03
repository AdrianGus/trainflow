import { EntityWithId } from '@/domain/shared/entity-with-id'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Optional } from '@/domain/shared/type/optional'
import { WorkoutStatusEnum } from '../enum/workout-status-enum'
import { WorkoutCircuitList } from './workouse-circuit-list'

type WorkoutProps = {
  title: string
  description: string
  circuits: WorkoutCircuitList
  status: WorkoutStatusEnum
}

export class Workout extends EntityWithId<WorkoutProps> {
  static create(
    props: Optional<WorkoutProps, 'circuits' | 'status'>,
    id?: UniqueEntityID
  ): Workout {
    return new Workout(
      {
        ...props,
        circuits: props.circuits ?? new WorkoutCircuitList([]),
        status: props.status ?? WorkoutStatusEnum.ACTIVE
      },
      id
    )
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }

  get circuits() {
    return this.props.circuits
  }

  clearExercises() {
    this.props.circuits = new WorkoutCircuitList([])

    return this
  }

  get status() {
    return this.props.status
  }
}
