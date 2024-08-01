import { expect, test } from 'vitest'
import { WatchedList } from './watched-list'

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

test('it shold be able to create a new watched list with initial items', () => {
  const list = new NumberWatchedList([1, 2, 3])

  expect(list.getItems()).toStrictEqual([1, 2, 3])
})

test('it should be able to add a new item to the list', () => {
  const list = new NumberWatchedList([1, 2, 3])

  list.add(8)

  expect(list.getItems()).toStrictEqual([1, 2, 3, 8])
})

test('it should be able to remove a item from list', () => {
  const list = new NumberWatchedList([1, 2, 3])

  list.remove(3)

  expect(list.getItems()).toStrictEqual([1, 2])
  expect(list.getRemovedItems()).toStrictEqual([3])
})
