export class InvalidAmountError extends Error {
  constructor(reason: string) {
    super(reason);

    this.name = this.constructor.name;
  }
}
