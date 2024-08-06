import { expect, test } from 'vitest'
import { Exercise } from './exercise'
import { Circuit } from './circuit'
import { CircuitExerciseList } from './circuit-exercise-list'

test('it should be able to create a new circuit', () => {
  const circuit = Circuit.create({
    title: 'Corrida',
    description: 'Corrida leve',
    exercises: new CircuitExerciseList([
      Exercise.create({
        title: 'Corrida',
        description: 'Corrida leve'
      })
    ])
  })

  expect(circuit).toBeInstanceOf(Circuit)
})

test('it should be able to remove all exercises from the circuit', () => {
  const exercise = Exercise.create({
    title: 'Corrida',
    description: 'Corrida leve'
  })

  const circuit = Circuit.create({
    title: 'Corrida',
    description: 'Corrida leve',
    exercises: new CircuitExerciseList([exercise])
  })

  circuit.clearExercises()

  expect(circuit.exercises.currentItems).toHaveLength(0)
})

test('it should be able to remove an exercise from the circuit', () => {
  const exercise = Exercise.create({
    title: 'Corrida',
    description: 'Corrida leve'
  })

  const circuit = Circuit.create({
    title: 'Corrida',
    description: 'Corrida leve',
    exercises: new CircuitExerciseList([exercise])
  })

  circuit.exercises.remove(exercise)

  expect(circuit.exercises.currentItems).toHaveLength(0)
})
