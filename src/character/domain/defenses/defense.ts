import { SerializedDefense } from '../character/serialized-character';
import { DamageType, isDamageType } from '../damage/damage';
import { UnknownDefenseType } from './errors/unknown-defense-type.error';

const defenseType = ['resistance', 'immunity'] as const;
export type DefenseType = (typeof defenseType)[number];
export const isDefenseType = (candidate: any): candidate is DefenseType =>
  defenseType.includes(candidate);

export class Defense {
  constructor(
    private readonly _type: DefenseType,
    private readonly _damageType: DamageType,
  ) {}

  get type() {
    return this._type;
  }

  get damageType() {
    return this._damageType;
  }
}

export class DefenseFactory {
  static fromSerialized(defense: SerializedDefense) {
    if (!isDefenseType(defense.defense) || !isDamageType(defense.type)) {
      throw new UnknownDefenseType(`Invalid defense type found`);
    }

    return new Defense(defense.defense, defense.type);
  }
}
