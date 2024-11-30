import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AddCardContentRequest,
  AddCardContentResponse,
  AddCardContentsRequest,
  AddCardContentsResponse,
  AddCardRequest,
  AddCardResponse,
  CARD_SERVICE_NAME,
  CardServiceController,
  DeleteCardContentRequest,
  DeleteCardContentResponse,
  DeleteCardRequest,
  DeleteCardResponse,
  GetCardByTitleRequest,
  GetCardByTitleResponse,
  GetCardContentByIdRequest,
  GetCardContentByIdResponse,
  GetCardContentsRequest,
  GetCardContentsResponse,
  UpdateCardContentRequest,
  UpdateCardContentResponse,
  UpdateCardTitleRequest,
  UpdateCardTitleResponse,
} from 'src/proto/card';
import { CardService } from 'src/services/card.service';

@Controller()
export class CardController implements CardServiceController {
  constructor(private readonly cardService: CardService) {}

  @GrpcMethod(CARD_SERVICE_NAME)
  async addCard(@Body() request: AddCardRequest): Promise<AddCardResponse> {
    return this.cardService
      .createCard({
        title: request.title,
        titleKr: request.titleKr,
      })
      .then((result) => {
        const response: AddCardResponse = {
          message: 'Card added successfully',
          data: {
            card: {
              id: result.id,
              title: result.title,
              titleKr: result.title_kr,
              createdAt: result.created_at.toISOString(),
            },
          },
        };
        return response;
      });
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async addCardContent(
    request: AddCardContentRequest,
  ): Promise<AddCardContentResponse> {
    const response = await this.cardService
      .createCardContent({
        cardId: request.cardId,
        keywords: request.cardContent.keywords,
        advice: request.cardContent.advice,
      })
      .then((result) => {
        const response: AddCardContentResponse = {
          message: 'Card content added successfully',
          data: {
            cardContent: {
              id: result.id,
              keywords: result.keywords,
              advice: result.advice,
              createdAt: result.created_at.toISOString(),
            },
          },
        };
        return response;
      });
    return response;
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async addCardContents(
    request: AddCardContentsRequest,
  ): Promise<AddCardContentsResponse> {
    return this.cardService
      .createCardContents({
        cardId: request.cardId,
        contents: request.cardContents.map((content) => ({
          keywords: content.keywords,
          advice: content.advice,
        })),
      })
      .then(() => {
        const response: AddCardContentsResponse = {
          message: 'Card contents added successfully',
        };
        return response;
      });
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async getCardByTitle(
    request: GetCardByTitleRequest,
  ): Promise<GetCardByTitleResponse> {
    return this.cardService.getCard({ title: request.title }).then((result) => {
      const response: GetCardByTitleResponse = {
        message: 'Card found',
        data: {
          card: {
            id: result.id,
            title: result.title,
            titleKr: result.title_kr,
            createdAt: result.created_at.toISOString(),
          },
        },
      };
      return response;
    });
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async getCardContents(
    request: GetCardContentsRequest,
  ): Promise<GetCardContentsResponse> {
    return this.cardService
      .getCardContents({ cardId: request.cardId })
      .then((contents) => {
        const response: GetCardContentsResponse = {
          message: 'Card contents found',
          data: {
            cardContents: contents.map((content) => ({
              id: content.id,
              keywords: content.keywords,
              advice: content.advice,
              createdAt: content.created_at.toISOString(),
            })),
          },
        };
        return response;
      });
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async getCardContentById(
    request: GetCardContentByIdRequest,
  ): Promise<GetCardContentByIdResponse> {
    return this.cardService
      .getCardContent({ cardContentId: request.cardContentId })
      .then((result) => {
        const response: GetCardContentByIdResponse = {
          message: 'Card content found',
          data: {
            cardContent: {
              id: result.id,
              keywords: result.keywords,
              advice: result.advice,
              createdAt: result.created_at.toISOString(),
            },
          },
        };
        return response;
      });
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async updateCardTitle(
    request: UpdateCardTitleRequest,
  ): Promise<UpdateCardTitleResponse> {
    return this.cardService
      .updateCardTitle({
        targetTitle: request.cardId,
        title: request.title,
        title_kr: request.titleKr,
      })
      .then((result) => {
        const response: UpdateCardTitleResponse = {
          message: 'Card title updated successfully',
          data: {
            card: {
              id: result.id,
              title: result.title,
              titleKr: result.title_kr,
              createdAt: result.created_at.toISOString(),
            },
          },
        };
        return response;
      });
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async updateCardContent(
    request: UpdateCardContentRequest,
  ): Promise<UpdateCardContentResponse> {
    return this.cardService
      .updateCardContent({
        cardContentId: request.cardContentId,
        keywords: request.cardContent.keywords,
        advice: request.cardContent.advice,
      })
      .then((result) => {
        const response: UpdateCardContentResponse = {
          message: 'Card content updated successfully',
          data: {
            cardContent: {
              id: result.id,
              keywords: result.keywords,
              advice: result.advice,
              createdAt: result.created_at.toISOString(),
            },
          },
        };
        return response;
      });
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async deleteCard(request: DeleteCardRequest): Promise<DeleteCardResponse> {
    return this.cardService.deleteCard({ title: request.title }).then(() => {
      const response: DeleteCardResponse = {
        message: 'Card deleted successfully',
      };
      return response;
    });
  }

  @GrpcMethod(CARD_SERVICE_NAME)
  async deleteCardContent(
    request: DeleteCardContentRequest,
  ): Promise<DeleteCardContentResponse> {
    return this.cardService
      .deleteCardContent({ cardContentId: request.cardContentId })
      .then(() => {
        const response: DeleteCardContentResponse = {
          message: 'Card content deleted successfully',
        };
        return response;
      });
  }
}
