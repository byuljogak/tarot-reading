import { Module } from '@nestjs/common';
import { OpenaiModule } from './openai/openai.module';
import { TarotController } from 'src/controllers/tarot.controller';
import { TarotService } from 'src/services/tarot.service';
import { CardService } from 'src/services/card.service';

@Module({
  imports: [OpenaiModule],
  controllers: [TarotController],
  providers: [TarotService, CardService],
})
export class TarotModule {}
