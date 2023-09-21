import { Amount } from '../core/amount';

export interface HitPoints {
  currentAmount: Amount;
  heal(amount: Amount): HitPoints;
  dealDamage(damage: Amount): HitPoints;
}

export class NormalHitPoints implements HitPoints {
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
      throw new RangeError(
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
