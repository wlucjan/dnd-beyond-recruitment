import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  CHARACTER_REPOSITORY,
  CharacterRepository,
} from '../../domain/character/character.repository';
import { DamageDealt } from '../../domain/damage/damage';

export class DamageDealtDto {
  type: string;
  amount: number;
}

@Exclude()
export class HitPointsDto {
  @Expose()
  @Transform(({ obj }) => obj.hitPoints.maxAmount.value)
  max: number;

  @Expose()
  @Transform(({ obj }) => obj.hitPoints.currentAmount.value)
  current: number;

  @Expose()
  @Transform(({ obj }) => obj.temporaryAmount.value)
  temporary: number;
}

@Exclude()
export class CharacterDto {
  @Expose()
  hitPoints: HitPointsDto;
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
