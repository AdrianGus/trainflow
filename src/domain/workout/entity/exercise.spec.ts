import { expect, test } from 'vitest'
import { Exercise } from './exercise'

test('it should be able to create a new exercise', () => {
  const exercise = Exercise.create({
    title: 'Corrida',
    description: 'Corrida leve'
  })

  expect(exercise).toBeInstanceOf(Exercise)
})
