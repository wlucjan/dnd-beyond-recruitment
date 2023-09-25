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
import { CharacterNotFound } from '../errors/character-not-found.error';
import {
  DealDamageCommand,
  DealDamageCommandHandler,
} from './deal-damage.command';

describe('DealDamageCommandHandler', () => {
  let handler: DealDamageCommandHandler;
  let repository: CharacterRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        DealDamageCommandHandler,
        {
          provide: CHARACTER_REPOSITORY,
          useClass: CharacterInMemoryRepository,
        },
      ],
    }).compile();

    handler = module.get<DealDamageCommandHandler>(DealDamageCommandHandler);
    repository = module.get<CharacterRepository>(CHARACTER_REPOSITORY);
  });

  it('should deal damage', async () => {
    // Given
    const characterId = 'luc';
    const character = new Character(
      new CharacterDamageCalculator(),
      characterId,
      HitPointsWithTemporaryHitPoints.from(NormalHitPoints.from(20)),
      [],
    );
    await repository.save(character);

    // When
    const result = await handler.execute(
      new DealDamageCommand(characterId, [{ type: 'slashing', amount: 10 }]),
    );

    // Then
    expect(result).toEqual({
      hitPoints: { max: 20, current: 10, temporary: 0 },
    });

    const savedCharacter = await repository.findOne(characterId);
    expect(savedCharacter.hitPoints.maxAmount.value).toEqual(20);
    expect(savedCharacter.hitPoints.currentAmount.value).toEqual(10);
    expect(savedCharacter.hitPoints.temporaryAmount.value).toEqual(0);
  });

  it('should throw NotFound error if character does not exist', async () => {
    // When & Then
    const command = new DealDamageCommand('unknown', [
      { type: 'slashing', amount: 10 },
    ]);

    await expect(handler.execute(command)).rejects.toThrowError(
      CharacterNotFound,
    );
  });
});
