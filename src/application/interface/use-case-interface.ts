export abstract class UseCaseInterface<Input, Output> {
  abstract execute(input: Input): Promise<Output>
}
