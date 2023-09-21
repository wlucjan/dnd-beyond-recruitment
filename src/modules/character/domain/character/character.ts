import { Amount } from '../core/amount';
import { Damage } from '../damage/damage';
import { DamageCalculator } from '../damage/damage-calculator';
import { DamageModifiers } from '../damage/damage-modifiers';
import { Defense } from '../defenses/defense';
import { HitPoints, NormalHitPoints } from './hit-points';
import { HitPointsWithTemporaryHitPoints } from './hit-points-with-temporary-hit-points';

export class Character {
  constructor(
    private readonly damageCalculator: DamageCalculator,
    private _hitPoints: HitPoints = NormalHitPoints.from(0),
    private defenses: Defense[],
  ) {}

  get hitPoints() {
    return this._hitPoints;
  }

  heal(amount: Amount): void {
    this._hitPoints = this._hitPoints.heal(amount);
  }

  dealDamage(damageParts: Damage[]): void {
    const damageAfterDefenses = this.damageCalculator.calculate(
      damageParts,
      DamageModifiers.from(this.defenses),
    );

    this._hitPoints = damageAfterDefenses.reduce(
      (_hitPoints, damage) => _hitPoints.dealDamage(damage.damageAmount),
      this._hitPoints,
    );
  }

  conferTemporaryHitpoints(amount: Amount): void {
    this._hitPoints = HitPointsWithTemporaryHitPoints.from(
      this.hitPoints,
      amount,
    );
  }
}
