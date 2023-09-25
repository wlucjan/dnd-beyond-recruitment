import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CHARACTER_REPOSITORY,
  CharacterRepository,
} from '../../domain/character/character.repository';
import { DamageDealt } from '../../domain/damage/damage';
import { CharacterDto } from '../dtos/character.dto';
import { CharacterNotFound } from '../errors/character-not-found.error';

export class DamageDealtDto {
  type: string;
  amount: number;
}
export class DealDamageCommand {
  constructor(
    public readonly characterId: string,
    public readonly damageParts: DamageDealtDto[],
  ) {}
}

@CommandHandler(DealDamageCommand)
export class DealDamageCommandHandler
  implements ICommandHandler<DealDamageCommand>
{
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: CharacterRepository,
  ) {}

  async execute(command: DealDamageCommand): Promise<CharacterDto> {
    const character = await this.characterRepository.findOne(
      command.characterId,
    );

    if (!character) {
      throw new CharacterNotFound();
    }

    character.dealDamage(
      command.damageParts.map((damage) =>
        DamageDealt.from(damage.type, damage.amount),
      ),
    );

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
