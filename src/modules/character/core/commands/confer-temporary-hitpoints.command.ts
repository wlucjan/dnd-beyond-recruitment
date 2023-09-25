import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CHARACTER_REPOSITORY,
  CharacterRepository,
} from '../../domain/character/character.repository';
import { Amount } from '../../domain/core/amount';
import { CharacterDto } from '../dtos/character.dto';
import { CharacterNotFound } from '../errors/character-not-found.error';

export class ConferTemporaryHitpointsCommand {
  constructor(
    public readonly characterId: string,
    public readonly amount: number,
  ) {}
}

@CommandHandler(ConferTemporaryHitpointsCommand)
export class ConferTemporaryHitpointsCommandHandler
  implements ICommandHandler<ConferTemporaryHitpointsCommand>
{
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: CharacterRepository,
  ) {}

  async execute(
    command: ConferTemporaryHitpointsCommand,
  ): Promise<CharacterDto> {
    const character = await this.characterRepository.findOne(
      command.characterId,
    );

    if (!character) {
      throw new CharacterNotFound();
    }

    character.conferTemporaryHitpoints(Amount.from(command.amount));

    await this.characterRepository.save(character);

    return {
      hitPoints: {
        max: character.hitPoints.maxAmount.value,
        current: character.hitPoints.currentAmount.value,
        temporary: character.hitPoints.temporaryAmount.value,
      },
    };
  }
}
