import { SerializedDefense } from '../character/serialized-character';
import { isDamageType } from './damage';
import {
  DamageImmunity,
  DamageModifier,
  DamageModifierType,
  DamageResistance,
  DamageVulnerability,
  isDamageModifierType,
} from './damage-modifiers';
import { UnknownDamageModifierTypeException } from './errors/unknown-damage-modifier-type.exception';
import { UnknownDamageTypeException } from './errors/unknown-damage-type.exception';

export class DamageModifierFactory {
  static fromSerialized(serializedDefence: SerializedDefense): DamageModifier {
    if (!isDamageModifierType(serializedDefence.defense)) {
      throw new UnknownDamageModifierTypeException(
        `There is no defence type of: ${serializedDefence.defense}`,
      );
    }

    if (!isDamageType(serializedDefence.type)) {
      throw new UnknownDamageTypeException(
        `There is no damage type of: ${serializedDefence.type}`,
      );
    }

    switch (serializedDefence.defense as DamageModifierType) {
      case 'immunity':
        return DamageImmunity.from(serializedDefence.type);
      case 'resistance':
        return DamageResistance.from(serializedDefence.type);
      case 'vulnerability':
        return DamageVulnerability.from(serializedDefence.type);
    }
  }
}
