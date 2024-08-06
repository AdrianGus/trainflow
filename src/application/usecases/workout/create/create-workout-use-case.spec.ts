import { beforeEach, expect, test } from 'vitest'
import { InMemoryWorkoutRepository } from '../../../../../test/repository/in-memory-workout-repository'
import { CreateWorkoutUseCase } from './create-workout-use-case'
import { InMemoryAthleteRepository } from '../../../../../test/repository/in-memory-athlete-repository'
import { makeAthlete } from '../../../../../test/factory/make-athlete'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { WorkoutStatusEnum } from '@/domain/workout/enum/workout-status-enum'
import { object } from 'zod'

let inMemoryAthleteRepository: InMemoryAthleteRepository
let inMemoryWorkoutRepository: InMemoryWorkoutRepository

beforeEach(() => {
  inMemoryAthleteRepository = new InMemoryAthleteRepository()

  const athlete = makeAthlete({}, new UniqueEntityID('fake-athlete-id'))

  inMemoryAthleteRepository.create(athlete)

  inMemoryWorkoutRepository = new InMemoryWorkoutRepository()
})

test('it should be able to create a new workout', async () => {
  await new CreateWorkoutUseCase(inMemoryAthleteRepository, inMemoryWorkoutRepository).execute({
    athleteId: 'fake-athlete-id',
    title: 'workout',
    description: 'this is a workout test',
    circuits: [],
    status: WorkoutStatusEnum.ACTIVE
  })

  expect(inMemoryWorkoutRepository.items).toHaveLength(1)
})

test('it should not able to create a new Workout for a non existent athlete', async () => {
  await expect(
    new CreateWorkoutUseCase(inMemoryAthleteRepository, inMemoryWorkoutRepository).execute({
      athleteId: 'inexistent-athlete-id',
      title: 'workout',
      description: 'this is a workout test',
      circuits: [],
      status: WorkoutStatusEnum.ACTIVE
    })
  ).rejects.toThrowError()
})
