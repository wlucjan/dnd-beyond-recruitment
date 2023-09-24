import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ConferTemporaryHitpointsCommand } from '../core/commands/confer-temporary-hitpoints.command';
import { DealDamageCommand } from '../core/commands/deal-damage.command';
import { HealCommand } from '../core/commands/heal.command';

class DamageDto {
  type: string;
  amount: number;
}

class DealDamageDto {
  damageParts: DamageDto[];
}

class HealDto {
  amount: number;
}

class ConferTemporaryHitPointsDto {
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
