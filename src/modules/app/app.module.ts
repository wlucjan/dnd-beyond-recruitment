import { Module } from '@nestjs/common';
import { CharacterModule } from '../character';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CharacterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
