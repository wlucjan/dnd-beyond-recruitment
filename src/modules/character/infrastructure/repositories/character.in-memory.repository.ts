import { Character } from '../../domain/character/character';
import { CharacterRepository } from '../../domain/character/character.repository';
import { CharacterEntity } from '../entities/character.entity';
import { CharacterFactory } from '../factories/character.factory';

export class CharacterInMemoryRepository implements CharacterRepository {
  private entities: Map<string, CharacterEntity> = new Map();

  async findOne(id: string): Promise<Character | undefined> {
    const entity = this.entities.get(id);

    if (!entity) {
      return undefined;
    }

    return CharacterFactory.fromEntity(entity);
  }

  async save(character: Character): Promise<void> {
    this.entities.set(character.id, CharacterFactory.toEntity(character));
  }

  async initialize(entity: CharacterEntity): Promise<void> {
    this.entities.set(entity.id, entity);
  }
}
