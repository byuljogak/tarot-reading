import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ReadTarotRequest,
  ReadTarotResponse,
  TAROT_SERVICE_NAME,
  TarotServiceController,
} from 'src/proto/tarot_service';
import { TarotService } from 'src/services/tarot.service';

@Controller()
export class TarotController implements TarotServiceController {
  constructor(private readonly tarotService: TarotService) {}

  @GrpcMethod(TAROT_SERVICE_NAME)
  async readTarot(_request: ReadTarotRequest): Promise<ReadTarotResponse> {
    return this.tarotService.readTarot().then((result) => {
      const response: ReadTarotResponse = {
        card: {
          title: result.card.title,
          titleKr: result.card.title_kr,
          createdAt: {
            seconds: result.card.created_at.getTime() / 1000,
            nanos: result.card.created_at.getMilliseconds() * 1000000,
          },
        },
        cardContents: {
          keywords: result.content.keywords,
          advice: result.content.advice,
          createdAt: {
            seconds: result.content.created_at.getTime() / 1000,
            nanos: result.content.created_at.getMilliseconds() * 1000000,
          },
        },
      };
      return response;
    });
  }
}
