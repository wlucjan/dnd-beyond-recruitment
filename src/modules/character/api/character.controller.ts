import { IsDamageType } from '@/app/validators/is-damage-type.validator';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Type } from 'class-transformer';
import { IsArray, IsPositive, IsString, ValidateNested } from 'class-validator';
import { ConferTemporaryHitpointsCommand } from '../core/commands/confer-temporary-hitpoints.command';
import { DealDamageCommand } from '../core/commands/deal-damage.command';
import { HealCommand } from '../core/commands/heal.command';

class DamageDto {
  @IsString()
  @IsDamageType()
  type: string;

  @IsPositive()
  amount: number;
}

class DealDamageDto {
  @IsArray()
  @ValidateNested()
  @Type(() => DamageDto)
  damageParts: DamageDto[];
}

class HealDto {
  @IsPositive()
  amount: number;
}

class ConferTemporaryHitPointsDto {
  @IsPositive()
  amount: number;
}
@Controller('characters/:id')
export class CharacterController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('damage')
  async dealDamage(@Param('id') id: string, @Body() dto: DealDamageDto) {
    const command = new DealDamageCommand(id, dto.damageParts);

    return this.commandBus.execute(command);
  }

  @Post('heal')
  async heal(@Param('id') id: string, @Body() dto: HealDto) {
    const command = new HealCommand(id, dto.amount);

    return this.commandBus.execute(command);
  }

  @Post('temporary-hit-points')
  async conferTemporaryHitPoints(
    @Param('id') id: string,
    @Body() dto: ConferTemporaryHitPointsDto,
  ) {
    const command = new ConferTemporaryHitpointsCommand(id, dto.amount);

    return this.commandBus.execute(command);
  }
}
