import { DamageType } from '../../domain/damage/damage';
import { DefenseType } from '../../domain/defenses/defense';

class HitPoints {
  constructor(
    public readonly max: number,
    public readonly current: number,
    public readonly temporary: number,
  ) {}
}

class Defense {
  constructor(
    public readonly type: DamageType,
    public readonly defense: DefenseType,
  ) {}
}

export class CharacterEntity {
  constructor(
    public readonly id: string,
    public readonly hitPoints: HitPoints,
    public readonly defenses: Defense[],
  ) {}
}
