import { isDamageType } from '../../domain/damage/damage';
import { isDefenseType } from '../../domain/defenses/defense';
import { CharacterEntity } from '../entities/character.entity';
import { InitialSerializedCharacter } from './initial-serialized-character';

export class InitialCharacterFactory {
  static fromSerialized(
    id: string,
    serializedCharacter: InitialSerializedCharacter,
  ) {
    return new CharacterEntity(
      id,
      {
        max: serializedCharacter.hitPoints,
        current: serializedCharacter.hitPoints,
        temporary: 0,
      },
      serializedCharacter.defenses.map(({ type, defense }) => {
        if (!isDamageType(type)) {
          throw new Error(`Invalid serialized defense damage type`);
        }

        if (!isDefenseType(defense)) {
          throw new Error(`Invalid serialized defense type`);
        }

        return { type, defense };
      }),
    );
  }
}
