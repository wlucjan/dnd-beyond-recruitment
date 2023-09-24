import { Amount } from '../core/amount';
import { NormalHitPoints } from './hit-points';

export class HitPointsWithTemporaryHitPoints {
  private constructor(
    private readonly hitPoints: NormalHitPoints,
    private readonly _amount: Amount = Amount.from(0),
  ) {}

  static from(
    hitPoints: NormalHitPoints,
    amount?: Amount,
  ): HitPointsWithTemporaryHitPoints {
    return new HitPointsWithTemporaryHitPoints(
      hitPoints,
      amount ?? Amount.from(0),
    );
  }

  get currentAmount(): Amount {
    return this.hitPoints.currentAmount;
  }

  get maxAmount(): Amount {
    return this.hitPoints.maxAmount;
  }

  get temporaryAmount(): Amount {
    return this._amount;
  }

  confer(amount: Amount): HitPointsWithTemporaryHitPoints {
    return new HitPointsWithTemporaryHitPoints(
      this.hitPoints,
      this._amount.max(amount),
    );
  }

  heal(amount: Amount): HitPointsWithTemporaryHitPoints {
    return new HitPointsWithTemporaryHitPoints(
      this.hitPoints.heal(amount),
      this._amount,
    );
  }

  dealDamage(damage: Amount): HitPointsWithTemporaryHitPoints {
    const overflow = damage.subtract(this._amount);
    const newAmount = this._amount.subtract(damage);

    return new HitPointsWithTemporaryHitPoints(
      this.hitPoints.dealDamage(overflow),
      newAmount,
    );
  }
}
