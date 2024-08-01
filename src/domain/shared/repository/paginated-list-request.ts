export class PaginatedListRequest {
  private page: number
  private size: number

  private quantityOfItems: number = 0

  constructor(page: number = 1, limit: number = 15) {
    this.page = page
    this.size = limit
  }

  public nextPage(): this {
    this.page += 1

    return this
  }

  public hasNextPage(): boolean {
    if (!this.quantityOfItems) return false

    return (this.page - 1) * this.size < this.quantityOfItems
  }

  public setQuantityOfItems(quantityOfItems: number): this {
    this.quantityOfItems = quantityOfItems

    return this
  }

  public getPage(): number {
    return this.page
  }

  public getSize(): number {
    return this.size
  }
}
