import { CharacterDamageCalculator } from '../damage/damage-calculator';
import { DefenseFactory } from '../defenses/defense';
import { Character } from './character';
import { NormalHitPoints } from './hit-points';
import { SerializedCharacter } from './serialized-character';

export class CharacterFactory {
  static fromSerialized(serializedCharacter: SerializedCharacter) {
    return new Character(
      new CharacterDamageCalculator(),
      NormalHitPoints.from(serializedCharacter.hitPoints),
      serializedCharacter.defenses.map((serializedDefence) =>
        DefenseFactory.fromSerialized(serializedDefence),
      ),
    );
  }
}
