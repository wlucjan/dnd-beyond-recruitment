import { InvalidAmountError } from '../errors/invalid-amount.error';

export class Amount {
  private constructor(private readonly _value: number) {}

  static from(amount: number): Amount {
    if (!Number.isInteger(amount)) {
      throw new InvalidAmountError(`Amount must be an integer`);
    }

    return new Amount(amount);
  }

  get value(): number {
    return this._value;
  }

  add(otherAmount: Amount): Amount {
    return new Amount(this.value + otherAmount.value);
  }

  subtract(otherAmount: Amount): Amount {
    return new Amount(Math.max(0, this.value - otherAmount.value));
  }

  halve(): Amount {
    return new Amount(Math.floor(this._value / 2));
  }

  double(): Amount {
    return new Amount(this._value * 2);
  }

  negate(): Amount {
    return new Amount(0);
  }

  max(otherAmount: Amount) {
    return new Amount(Math.max(this._value, otherAmount._value));
  }

  min(otherAmount: Amount) {
    return new Amount(Math.min(this._value, otherAmount._value));
  }

  isLessThanOrEqual(otherAmount: Amount): boolean {
    return this._value <= otherAmount._value;
  }
}
