import { faker } from '@faker-js/faker'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Workout, WorkoutProps } from '@/domain/workout/entity/workout'
import { WorkoutCircuitList } from '@/domain/workout/entity/workout-circuit-list'

export function makeWorkout(override: Partial<WorkoutProps> = {}, id?: UniqueEntityID) {
  const workout = Workout.create(
    {
      athleteId: new UniqueEntityID(faker.database.mongodbObjectId()),
      title: faker.name.jobTitle(),
      description: faker.lorem.paragraph(),
      circuits: new WorkoutCircuitList(),
      ...override
    },
    id
  )

  return workout
}
