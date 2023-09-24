import { Amount } from '../core/amount';

export class NormalHitPoints {
  private constructor(
    private readonly _maxAmount: Amount,
    private readonly _currentAmount: Amount,
  ) {}

  static from(maxAmount: number, currentAmount?: number) {
    if (
      currentAmount !== undefined &&
      currentAmount !== null &&
      currentAmount > maxAmount
    ) {
      throw new Error(
        `Current hit points cannot be greater than max hit points`,
      );
    }

    return new NormalHitPoints(
      Amount.from(maxAmount),
      Amount.from(currentAmount ?? maxAmount),
    );
  }

  get currentAmount(): Amount {
    return this._currentAmount;
  }

  get maxAmount(): Amount {
    return this._maxAmount;
  }

  heal(healedAmount: Amount): NormalHitPoints {
    const newCurrentAmount = this._currentAmount.add(healedAmount);

    return new NormalHitPoints(
      this._maxAmount,
      this._maxAmount.min(newCurrentAmount),
    );
  }

  dealDamage(damage: Amount): NormalHitPoints {
    const newCurrentAmount = this._currentAmount.subtract(damage);

    return new NormalHitPoints(this._maxAmount, newCurrentAmount);
  }
}
