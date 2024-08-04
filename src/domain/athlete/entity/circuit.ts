import { EntityWithId } from '@/domain/shared/entity-with-id'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { CircuitStatusEnum } from '../enum/circuit-status-enum'
import { CircuitExerciseList } from './circuit-exercise-list'
import { Optional } from '@/domain/shared/type/optional'

type CircuitProps = {
  title: string
  description: string
  exercises: CircuitExerciseList
  status: CircuitStatusEnum
}

export class Circuit extends EntityWithId<CircuitProps> {
  static create(props: Optional<CircuitProps, 'status'>, id?: UniqueEntityID): Circuit {
    return new Circuit(
      {
        ...props,
        status: CircuitStatusEnum.ACTIVE
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

  get exercises() {
    return this.props.exercises
  }

  clearExercises() {
    this.props.exercises = new CircuitExerciseList([])

    return this
  }

  get status() {
    return this.props.status
  }
}
