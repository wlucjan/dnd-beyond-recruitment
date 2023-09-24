import { CharacterEntity } from '../../infrastructure/entities/character.entity';
import { Character } from './character';

export const CHARACTER_REPOSITORY = Symbol('CharacterRepository');

export interface CharacterRepository {
  initialize(arg0: CharacterEntity): Promise<void>;
  findOne(id: string): Promise<Character>;
  save(character: Character): Promise<void>;
}
