import { expect, test } from 'vitest'
import { Athlete } from './athlete'
import { Email } from '../value-object/email'
import { Phone } from '../value-object/phone'
import { Address } from '../value-object/address'
import { Workout } from './workout'
import { WorkoutCircuitList } from './workouse-circuit-list'

test('it should be able to create a new athlete', () => {
  const athlete = Athlete.create({
    name: 'John Doe',
    email: Email.createFromString('john@example.com'),
    password: '123',
    phone: Phone.createFromString('51 991612923'),
    address: Address.create({
      zipCode: '915550000',
      street: 'Rua teste',
      number: 123,
      district: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      complement: 'Complemento teste'
    })
  })

  expect(athlete).toBeInstanceOf(Athlete)
})

test('it should not be able to create a new athlete with invalid email', () => {
  expect(() => {
    Athlete.create({
      name: 'John Doe',
      email: Email.createFromString('invalid-email'),
      password: '123',
      phone: Phone.createFromString('51 991612923'),
      address: Address.create({
        zipCode: '915550000',
        street: 'Rua teste',
        number: 123,
        district: 'Bairro teste',
        city: 'Cidade teste',
        state: 'Estado teste',
        complement: 'Complemento teste'
      })
    })
  }).toThrowError('Invalid email')
})

test('it should be able to add a new workout to the athlete', () => {
  const athlete = Athlete.create({
    name: 'John Doe',
    email: Email.createFromString('john@example.com'),
    password: '123',
    phone: Phone.createFromString('51 991612923'),
    address: Address.create({
      zipCode: '915550000',
      street: 'Rua teste',
      number: 123,
      district: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      complement: 'Complemento teste'
    })
  })

  athlete.workouts.add(
    Workout.create({
      athleteId: athlete.id,
      title: 'Treino A',
      description: 'Treino de força',
      circuits: new WorkoutCircuitList()
    })
  )

  expect(athlete.workouts).toHaveLength(1)
})

test('it should be able to remove a workout from the athlete', () => {
  const athlete = Athlete.create({
    name: 'John Doe',
    email: Email.createFromString('john@example.com'),
    password: '123',
    phone: Phone.createFromString('51 991612923'),
    address: Address.create({
      zipCode: '915550000',
      street: 'Rua teste',
      number: 123,
      district: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      complement: 'Complemento teste'
    })
  })

  const workout = Workout.create({
    athleteId: athlete.id,
    title: 'Treino A',
    description: 'Treino de força',
    circuits: new WorkoutCircuitList()
  })

  athlete.workouts.add(workout)

  athlete.workouts.remove(workout)

  expect(athlete.workouts).toHaveLength(0)
})

test('it should be able to clear all workouts from the athlete', () => {
  const athlete = Athlete.create({
    name: 'John Doe',
    email: Email.createFromString('john@example.com'),
    password: '123',
    phone: Phone.createFromString('51 991612923'),
    address: Address.create({
      zipCode: '915550000',
      street: 'Rua teste',
      number: 123,
      district: 'Bairro teste',
      city: 'Cidade teste',
      state: 'Estado teste',
      complement: 'Complemento teste'
    })
  })

  athlete.workouts.add(
    Workout.create({
      athleteId: athlete.id,
      title: 'Treino A',
      description: 'Treino de força',
      circuits: new WorkoutCircuitList()
    })
  )

  athlete.clearWorkouts()

  expect(athlete.workouts).toHaveLength(0)
})
