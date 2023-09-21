import { Defense } from '../defenses/defense';
import { Damage, DamageType } from './damage';

const damageModifierType = ['resistance', 'immunity', 'vulnerability'] as const;
export type DamageModifierType = (typeof damageModifierType)[number];
export const isDamageModifierType = (
  candidate: any,
): candidate is DamageModifierType => damageModifierType.includes(candidate);

export interface DamageModifier {
  type: DamageModifierType;
  damageType: DamageType;
  apply(damage: Damage): Damage;
}

export class DamageResistance implements DamageModifier {
  type: DamageModifierType = 'resistance';

  private constructor(public readonly damageType: DamageType) {}

  static from(damageType: DamageType): DamageResistance {
    return new DamageResistance(damageType);
  }

  apply(damage: Damage): Damage {
    return damage.isOfType(this.damageType) ? damage.halve() : damage;
  }
}

export class DamageImmunity implements DamageModifier {
  type: DamageModifierType = 'immunity';

  private constructor(public readonly damageType: DamageType) {}

  static from(damageType: DamageType): DamageImmunity {
    return new DamageImmunity(damageType);
  }

  apply(damage: Damage): Damage {
    return damage.isOfType(this.damageType) ? damage.negate() : damage;
  }
}

export class DamageVulnerability implements DamageModifier {
  type: DamageModifierType = 'vulnerability';

  private constructor(public readonly damageType: DamageType) {}

  static from(damageType: DamageType): DamageVulnerability {
    return new DamageVulnerability(damageType);
  }

  apply(damage: Damage): Damage {
    return damage.isOfType(this.damageType) ? damage.double() : damage;
  }
}

export class DamageModifiers {
  constructor(
    private readonly immunities: DamageImmunity[],
    private readonly resistances: DamageResistance[],
    private readonly vulnerabilities: DamageVulnerability[],
  ) {}

  static from(defenses: Defense[]) {
    return new DamageModifiers(
      defenses
        .filter((defense) => defense.type === 'immunity')
        .map((defense) => DamageImmunity.from(defense.damageType)),
      defenses
        .filter((defense) => defense.type === 'resistance')
        .map((defense) => DamageResistance.from(defense.damageType)),
      [],
    );
  }

  applyImmunities(damage: Damage): Damage {
    return this.immunities.reduce(
      (damage, immunity) => immunity.apply(damage),
      damage,
    );
  }

  applyResistances(damage: Damage): Damage {
    return this.resistances.reduce(
      (damage, resistance) => resistance.apply(damage),
      damage,
    );
  }

  applyVulnerabilities(damage: Damage): Damage {
    return this.vulnerabilities.reduce(
      (damage, vulnerability) => vulnerability.apply(damage),
      damage,
    );
  }
}
