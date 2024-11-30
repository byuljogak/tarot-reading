import { Module } from '@nestjs/common';
import { CardController } from 'src/controllers/card.controller';
import { CardService } from 'src/services/card.service';

@Module({
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
