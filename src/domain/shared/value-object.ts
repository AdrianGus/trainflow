export abstract class ValueObject<TProps> {
  protected readonly props: TProps

  constructor(props: TProps) {
    this.props = props
  }
}
