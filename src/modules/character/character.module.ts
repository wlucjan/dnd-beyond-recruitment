import briv from '@fixtures/briv.json';
import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CharacterController } from './api/character.controller';
import { ConferTemporaryHitpointsCommandHandler } from './core/commands/confer-temporary-hitpoints.command';
import { DealDamageCommandHandler } from './core/commands/deal-damage.command';
import { HealCommandHandler } from './core/commands/heal.command';
import {
  CHARACTER_REPOSITORY,
  CharacterRepository,
} from './domain/character/character.repository';
import { InitialCharacterFactory } from './infrastructure/factories/initial-character.factory';
import { CharacterInMemoryRepository } from './infrastructure/repositories/character.in-memory.repository';
@Module({
  imports: [CqrsModule],
  providers: [
    DealDamageCommandHandler,
    HealCommandHandler,
    ConferTemporaryHitpointsCommandHandler,
    { provide: CHARACTER_REPOSITORY, useClass: CharacterInMemoryRepository },
  ],
  controllers: [CharacterController],
})
export class CharacterModule implements OnModuleInit {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly characterRepository: CharacterRepository,
  ) {}
  async onModuleInit() {
    console.log(`initialize`);
    await this.characterRepository.initialize(
      InitialCharacterFactory.fromSerialized('briv', briv),
    );
  }
}
