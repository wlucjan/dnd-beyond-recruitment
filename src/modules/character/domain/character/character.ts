import { Amount } from '../core/amount';
import { Damage } from '../damage/damage';
import { DamageCalculator } from '../damage/damage-calculator';
import { DamageModifiers } from '../damage/damage-modifiers';
import { Defense } from '../defenses/defense';
import { NormalHitPoints } from './hit-points';
import { HitPointsWithTemporaryHitPoints } from './hit-points-with-temporary-hit-points';

export class Character {
  constructor(
    private readonly damageCalculator: DamageCalculator,
    private _id: string,
    private _hitPoints: HitPointsWithTemporaryHitPoints = HitPointsWithTemporaryHitPoints.from(
      NormalHitPoints.from(0),
      Amount.from(0),
    ),
    private _defenses: Defense[],
  ) {}

  get id() {
    return this._id;
  }

  get hitPoints() {
    return this._hitPoints;
  }

  get defenses() {
    return this._defenses;
  }

  heal(amount: Amount): void {
    this._hitPoints = this._hitPoints.heal(amount);
  }

  dealDamage(damageParts: Damage[]): void {
    const damageAfterDefenses = this.damageCalculator.calculate(
      damageParts,
      DamageModifiers.from(this._defenses),
    );

    this._hitPoints = damageAfterDefenses.reduce(
      (_hitPoints, damage) => _hitPoints.dealDamage(damage.damageAmount),
      this._hitPoints,
    );
  }

  conferTemporaryHitpoints(amount: Amount): void {
    this._hitPoints = this.hitPoints.confer(amount);
  }
}
