import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DealDamageCommand } from '../core/commands/deal-damage.command';

class DamageDto {
  type: string;
  amount: number;
}

class DealDamageDto {
  damageParts: DamageDto[];
}

@Controller('characters/:id')
export class CharacterController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('damage')
  async dealDamage(@Param('id') id: string, @Body() dto: DealDamageDto) {
    const command = new DealDamageCommand(id, dto.damageParts);

    return this.commandBus.execute(command);
  }
}
