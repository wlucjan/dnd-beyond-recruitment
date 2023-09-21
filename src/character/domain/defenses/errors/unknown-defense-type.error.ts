export class UnknownDefenseType extends Error {
  constructor(reason: string) {
    super(reason);

    this.name = this.constructor.name;
  }
}
