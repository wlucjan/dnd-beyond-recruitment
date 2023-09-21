import { Amount } from '../core/amount';
import { HitPoints } from './hit-points';

export class HitPointsWithTemporaryHitPoints implements HitPoints {
  private constructor(
    private readonly hitPoints: HitPoints,
    private readonly _amount: Amount = Amount.from(0),
  ) {}

  static from(
    hitPoints: HitPoints,
    amount: Amount,
  ): HitPointsWithTemporaryHitPoints {
    return new HitPointsWithTemporaryHitPoints(hitPoints, amount);
  }

  get currentAmount(): Amount {
    return this.hitPoints.currentAmount.add(this._amount);
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
