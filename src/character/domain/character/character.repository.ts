import { Character } from './character';

export interface CharacterRepository {
  findOne(id: string): Promise<Character>;
  save(character: Character): Promise<void>;
}
