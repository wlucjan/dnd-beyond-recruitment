import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CHARACTER_REPOSITORY,
  CharacterRepository,
} from '../../domain/character/character.repository';
import { Amount } from '../../domain/core/amount';
import { CharacterDto } from '../dtos/character.dto';

export class HealCommand {
  constructor(
    public readonly characterId: string,
    public readonly amount: number,
  ) {}
}

@CommandHandler(HealCommand)
export class HealCommandHandler implements ICommandHandler<HealCommand> {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: CharacterRepository,
  ) {}

  async execute(command: HealCommand): Promise<CharacterDto> {
    const character = await this.characterRepository.findOne(
      command.characterId,
    );

    character.heal(Amount.from(command.amount));

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
