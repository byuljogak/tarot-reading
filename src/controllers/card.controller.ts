import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CARD_SERVICE_NAME,
  CardServiceController,
  CreateCardContentRequest,
  CreateCardContentResponse,
  CreateCardRequest,
  CreateCardResponse,
  DeleteCardContentRequest,
  DeleteCardContentResponse,
  DeleteCardRequest,
  DeleteCardResponse,
  ReadCardRequest,
  ReadCardResponse,
  UpdateCardContentRequest,
  UpdateCardContentResponse,
  UpdateCardRequest,
  UpdateCardResponse,
} from 'src/proto/card_service';
import { Timestamp } from 'src/proto/google/protobuf/timestamp';
import { CardService } from 'src/services/card.service';

@Controller()
export class CardController implements CardServiceController {
  constructor(private readonly cardService: CardService) {}

  @GrpcMethod(CARD_SERVICE_NAME)
  async createCard(request: CreateCardRequest): Promise<CreateCardResponse> {
    const response = await this.cardService.createCard({
      title: request.title,
      titleKr: request.titleKr,
    });

    const timestamp: Timestamp = {
      seconds: response.created_at.getTime() / 1000,
      nanos: response.created_at.getMilliseconds() * 1000000,
    };

    return {
      card: {
        id: response.id,
        title: response.title,
        titleKr: response.title_kr,
        createdAt: timestamp,
      },
    };
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async createCardContent(
    request: CreateCardContentRequest,
  ): Promise<CreateCardContentResponse> {
    const response = await this.cardService.createCardContent({
      cardId: request.cardId,
      keywords: request.keywords,
      advice: request.advice,
    });

    const cardCreatedAtTimestamp: Timestamp = {
      seconds: response.created_at.getTime() / 1000,
      nanos: response.created_at.getMilliseconds() * 1000000,
    };

    return {
      cardContent: {
        id: response.id,
        keywords: response.keywords,
        advice: response.advice,
        createdAt: cardCreatedAtTimestamp,
      },
    };
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async readCard(request: ReadCardRequest): Promise<ReadCardResponse> {
    const card = await this.cardService.readCard({ title: request.title });
    const cardContents = await this.cardService.readCardContents({
      cardId: card.id,
    });

    const cardCreatedAtTimestamp: Timestamp = {
      seconds: card.created_at.getTime() / 1000,
      nanos: card.created_at.getMilliseconds() * 1000000,
    };
    const modifiedCardContents = cardContents.map((content) => {
      const cardContentCreatedAtTimestamp: Timestamp = {
        seconds: content.created_at.getTime() / 1000,
        nanos: content.created_at.getMilliseconds() * 1000000,
      };
      return {
        id: content.id,
        keywords: content.keywords,
        advice: content.advice,
        createdAt: cardContentCreatedAtTimestamp,
      };
    });

    return {
      card: {
        id: card.id,
        title: card.title,
        titleKr: card.title_kr,
        createdAt: cardCreatedAtTimestamp,
      },
      cardContents: modifiedCardContents,
    };
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async updateCard(request: UpdateCardRequest): Promise<UpdateCardResponse> {
    const response = await this.cardService.updateCardTitle({
      cardId: request.id,
      title: request.title,
      titleKr: request.titleKr,
    });

    const timestamp: Timestamp = {
      seconds: response.created_at.getTime() / 1000,
      nanos: response.created_at.getMilliseconds() * 1000000,
    };

    return {
      card: {
        id: response.id,
        title: response.title,
        titleKr: response.title_kr,
        createdAt: timestamp,
      },
    };
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async updateCardContent(
    request: UpdateCardContentRequest,
  ): Promise<UpdateCardContentResponse> {
    const response = await this.cardService.updateCardContent({
      cardContentId: request.id,
      keywords: request.keywords,
      advice: request.advice,
    });

    const cardCreatedAtTimestamp: Timestamp = {
      seconds: response.created_at.getTime() / 1000,
      nanos: response.created_at.getMilliseconds() * 1000000,
    };

    return {
      cardContent: {
        id: response.id,
        keywords: response.keywords,
        advice: response.advice,
        createdAt: cardCreatedAtTimestamp,
      },
    };
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async deleteCard(request: DeleteCardRequest): Promise<DeleteCardResponse> {
    await this.cardService.deleteCard({ id: request.id });
    return;
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async deleteCardContent(
    request: DeleteCardContentRequest,
  ): Promise<DeleteCardContentResponse> {
    await this.cardService.deleteCardContent({ cardContentId: request.id });
    return;
  }
}
