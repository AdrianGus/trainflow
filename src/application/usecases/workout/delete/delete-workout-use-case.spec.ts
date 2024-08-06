import { beforeEach, expect, test } from 'vitest'
import { InMemoryWorkoutRepository } from '../../../../../test/repository/in-memory-workout-repository'
import { makeWorkout } from '../../../../../test/factory/make-workout'
import { DeleteWorkoutUseCase } from './delete-workout-use-case'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'

let inMemoryWorkoutRepository: InMemoryWorkoutRepository

beforeEach(() => {
  inMemoryWorkoutRepository = new InMemoryWorkoutRepository()
})

test('it should be able to delete a workout', async () => {
  inMemoryWorkoutRepository.create(makeWorkout({}, new UniqueEntityID('workout-id')))

  await new DeleteWorkoutUseCase(inMemoryWorkoutRepository).execute('workout-id')

  expect(inMemoryWorkoutRepository.items).toHaveLength(0)
})

test('it should not be able to delete a non existent workout', async () => {
  inMemoryWorkoutRepository.create(makeWorkout({}, new UniqueEntityID('workout-id')))

  await expect(
    new DeleteWorkoutUseCase(inMemoryWorkoutRepository).execute('workout-id-wrong')
  ).rejects.toThrowError()
})
