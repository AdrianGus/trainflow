import { beforeAll, expect, test } from 'vitest'
import { EntityWithId } from './entity-with-id'
import { UniqueEntityID } from './unique-entity-id'

let TestClass: any
beforeAll(() => {
  TestClass = class TestClass extends EntityWithId<{ testProp: string }> {
    constructor(props: { testProp: string }, id?: UniqueEntityID) {
      super(props, id)
    }
  }
})

test('it should generate an random unique id if not provided', () => {
  const testInstance = new TestClass({ testProp: 'value' })

  expect(testInstance.id).toBeInstanceOf(UniqueEntityID)
})

test('it should not generate an random unique id if provided', () => {
  const testInstance = new TestClass({ testProp: 'value' }, '123')

  expect(testInstance.id).toBe('123')
})
