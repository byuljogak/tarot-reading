import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  ReadTarotRequest,
  ReadTarotResponse,
  TAROT_SERVICE_NAME,
  TarotServiceController,
} from 'src/proto/tarot';
import { TarotService } from 'src/services/tarot.service';

@Controller()
export class TarotController implements TarotServiceController {
  constructor(private readonly tarotService: TarotService) {}

  @GrpcMethod(TAROT_SERVICE_NAME)
  readTarot(
    _request: ReadTarotRequest,
  ):
    | Promise<ReadTarotResponse>
    | Observable<ReadTarotResponse>
    | ReadTarotResponse {
    return this.tarotService.readTarot().then((result) => {
      const response: ReadTarotResponse = {
        message: 'Tarot read successfully',
        data: {
          card: {
            title: result.card.title,
            titleKr: result.card.title_kr,
            createdAt: result.card.created_at.toISOString(),
            contents: {
              keywords: result.content.keywords,
              advice: result.content.advice,
              createdAt: result.content.created_at.toISOString(),
            },
          },
        },
      };
      return response;
    });
  }
}
