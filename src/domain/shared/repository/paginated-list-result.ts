export class PaginatedListResult<T> {
  public items: T[]
  public total: number

  constructor(items: T[], total: number) {
    this.items = items
    this.total = total
  }

  public hasMoreItems(): boolean {
    return this.items.length < this.total
  }
}
