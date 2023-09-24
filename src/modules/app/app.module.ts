import { Module } from '@nestjs/common';
import { CharacterModule } from '../character';

@Module({
  imports: [CharacterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
