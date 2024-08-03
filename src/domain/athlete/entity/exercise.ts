import { EntityWithId } from '@/domain/shared/entity-with-id'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'

type ExerciseProps = {
  title: string
  description: string
}

export class Exercise extends EntityWithId<ExerciseProps> {
  static create(props: ExerciseProps, id?: UniqueEntityID): Exercise {
    return new Exercise(props, id)
  }

  get title() {
    return this.props.title
  }

  get description() {
    return this.props.description
  }
}
