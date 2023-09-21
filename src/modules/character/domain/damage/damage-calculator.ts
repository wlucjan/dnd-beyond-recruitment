import { Damage } from './damage';
import { DamageModifiers } from './damage-modifiers';

export interface DamageCalculator {
  calculate(damage: Damage[], modifiers: DamageModifiers): Damage[];
}

export class CharacterDamageCalculator implements DamageCalculator {
  calculate(damageParts: Damage[], modifiers: DamageModifiers): Damage[] {
    return damageParts.map((damage) =>
      modifiers.applyVulnerabilities(
        modifiers.applyResistances(modifiers.applyImmunities(damage)),
      ),
    );
  }
}
