import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { Character } from '../../domain/character/character';
import {
  CHARACTER_REPOSITORY,
  CharacterRepository,
} from '../../domain/character/character.repository';
import { NormalHitPoints } from '../../domain/character/hit-points';
import { HitPointsWithTemporaryHitPoints } from '../../domain/character/hit-points-with-temporary-hit-points';
import { CharacterDamageCalculator } from '../../domain/damage/damage-calculator';
import { CharacterInMemoryRepository } from '../../infrastructure/repositories/character.in-memory.repository';
import { HealCommand, HealCommandHandler } from './heal.command';

describe('HealCommandHandler', () => {
  let handler: HealCommandHandler;
  let repository: CharacterRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        HealCommandHandler,
        {
          provide: CHARACTER_REPOSITORY,
          useClass: CharacterInMemoryRepository,
        },
      ],
    }).compile();

    handler = module.get<HealCommandHandler>(HealCommandHandler);
    repository = module.get<CharacterRepository>(CHARACTER_REPOSITORY);
  });

  it('should heal character', async () => {
    // Given
    const characterId = 'luc';
    const character = new Character(
      new CharacterDamageCalculator(),
      characterId,
      HitPointsWithTemporaryHitPoints.from(NormalHitPoints.from(20, 10)),
      [],
    );
    await repository.save(character);

    // When
    const result = await handler.execute(new HealCommand(characterId, 10));

    // Then
    expect(result).toEqual({
      hitPoints: { max: 20, current: 20, temporary: 0 },
    });

    const savedCharacter = await repository.findOne(characterId);
    expect(savedCharacter.hitPoints.maxAmount.value).toEqual(20);
    expect(savedCharacter.hitPoints.currentAmount.value).toEqual(20);
    expect(savedCharacter.hitPoints.temporaryAmount.value).toEqual(0);
  });
});
