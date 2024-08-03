import { expect, test } from 'vitest'
import { Workout } from './workout'
import { UniqueEntityID } from '@/domain/shared/unique-entity-id'
import { Circuit } from './circuit'
import { CircuitExerciseList } from './circuit-exercise-list'
import { Exercise } from './exercise'
import { WorkoutCircuitList } from './workouse-circuit-list'

test('it should be able to create a new workouse without an id', () => {
  const workout = Workout.create({
    title: 'Muay Thai',
    description: 'Treino de muay thai intermediário'
  })

  expect(workout).toBeInstanceOf(Workout)
})

test('it should be able to create a new workouse with id', () => {
  const workout = Workout.create(
    {
      title: 'Muay Thai',
      description: 'Treino de muay thai intermediário'
    },
    new UniqueEntityID('123')
  )

  expect(workout).toBeInstanceOf(Workout)
  expect(workout.id.toValue()).toEqual('123')
})

test('it should be able to add a new circuit', () => {
  const workout = Workout.create({
    title: 'Muay Thai',
    description: 'Treino de muay thai intermediário',
    circuits: new WorkoutCircuitList([
      Circuit.create({
        title: 'Saco de pancada',
        description: 'Treino de força saco de pancada',
        exercises: new CircuitExerciseList([])
      })
    ])
  })

  const newCircuit = Circuit.create({
    title: 'Corrida leve',
    description: 'Treino de corrida para cárdio',
    exercises: new CircuitExerciseList([])
  })

  workout.circuits.add(newCircuit)

  expect(workout.circuits.currentItems).toHaveLength(2)
})

test('it should be able to remove all circuits', () => {
  const workout = Workout.create({
    title: 'Muay Thai',
    description: 'Treino de muay thai intermediário',
    circuits: new WorkoutCircuitList([
      Circuit.create({
        title: 'Saco de pancada',
        description: 'Treino de força saco de pancada',
        exercises: new CircuitExerciseList([])
      })
    ])
  })

  workout.clearExercises()

  expect(workout.circuits.currentItems).toHaveLength(0)
})

test('it should be able to remove a specific circuit', () => {
  const circuit = Circuit.create({
    title: 'Saco de pancada',
    description: 'Treino de força saco de pancada',
    exercises: new CircuitExerciseList([
      Exercise.create({
        title: 'Jab e direto',
        description: 'Treino de jab e direto'
      })
    ])
  })

  const workout = Workout.create({
    title: 'Muay Thai',
    description: 'Treino de muay thai intermediário',
    circuits: new WorkoutCircuitList([circuit])
  })

  workout.circuits.remove(circuit)

  expect(workout.circuits.currentItems).toHaveLength(0)
})
