import { Character } from '../../domain/character/character';
import { NormalHitPoints } from '../../domain/character/hit-points';
import { HitPointsWithTemporaryHitPoints } from '../../domain/character/hit-points-with-temporary-hit-points';
import { Amount } from '../../domain/core/amount';
import { CharacterDamageCalculator } from '../../domain/damage/damage-calculator';
import { DefenseFactory } from '../../domain/defenses/defense';
import { CharacterEntity } from '../entities/character.entity';

export class CharacterFactory {
  static fromEntity(characterEntity: CharacterEntity) {
    return new Character(
      new CharacterDamageCalculator(),
      characterEntity.id,
      HitPointsWithTemporaryHitPoints.from(
        NormalHitPoints.from(
          characterEntity.hitPoints.max,
          characterEntity.hitPoints.current,
        ),
        Amount.from(characterEntity.hitPoints.temporary),
      ),
      characterEntity.defenses.map((serializedDefence) =>
        DefenseFactory.fromSerialized(serializedDefence),
      ),
    );
  }

  static toEntity(character: Character) {
    return new CharacterEntity(
      character.id,
      {
        max: character.hitPoints.maxAmount.value,
        current: character.hitPoints.currentAmount.value,
        temporary: character.hitPoints.temporaryAmount.value,
      },
      character.defenses.map((defense) => ({
        type: defense.damageType,
        defense: defense.type,
      })),
    );
  }
}
