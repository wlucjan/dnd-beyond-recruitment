import { Amount } from '../core/amount';
import { UnknownDamageTypeException } from './errors/unknown-damage-type.exception';

const damageType = [
  'bludgeoning',
  'piercing',
  'slashing',
  'fire',
  'cold',
  'acid',
  'thunder',
  'lightning',
  'poison',
  'radiant',
  'necrotic',
  'psychic',
  'force',
] as const;

export type DamageType = (typeof damageType)[number];

export const isDamageType = (candidate: any): candidate is DamageType =>
  damageType.includes(candidate);

export interface Damage {
  damageAmount: Amount;
  damageType: DamageType;
  isOfType(damageType: DamageType): boolean;
  halve(): Damage;
  negate(): Damage;
  double(): Damage;
  subtract(amount: Amount): Damage;
  add(amount: Amount): Damage;
}

export class DamageDealt implements Damage {
  private constructor(
    private readonly _type: DamageType,
    private readonly _amount: Amount,
  ) {}

  static from(damageType: string, amount: number) {
    if (!isDamageType(damageType)) {
      throw new UnknownDamageTypeException(
        `There is no damage type of: ${damageType}`,
      );
    }

    return new DamageDealt(damageType, Amount.from(amount));
  }

  isOfType(damageType: DamageType): boolean {
    return this.damageType === damageType;
  }

  get damageType() {
    return this._type;
  }

  get damageAmount() {
    return this._amount;
  }

  halve() {
    return new DamageDealt(this._type, this._amount.halve());
  }

  double() {
    return new DamageDealt(this._type, this._amount.double());
  }

  negate() {
    return new DamageDealt(this._type, this._amount.negate());
  }

  subtract(amount: Amount): Damage {
    return new DamageDealt(this._type, this._amount.subtract(amount));
  }

  add(amount: Amount): Damage {
    return new DamageDealt(this._type, this._amount.add(amount));
  }
}
