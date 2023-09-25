import { Module } from '@nestjs/common';
import { CharacterModule } from '../modules/character';
import { AllExceptionsFilter } from './all-exceptions-filter';

@Module({
  imports: [CharacterModule],
  controllers: [],
  providers: [AllExceptionsFilter],
})
export class AppModule {}
