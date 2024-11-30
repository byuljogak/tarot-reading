import { Injectable } from '@nestjs/common';
import { OpenaiService } from './oepnai/openai.service';
import { EnvConfig } from 'src/schemas/server_config.schema';
import { ConfigService } from '@nestjs/config';
import { CardService } from './card.service';
import { Card, CardContent } from '@prisma/client';

@Injectable()
export class TarotService {
  constructor(
    private readonly config: ConfigService<EnvConfig, true>,
    private readonly openai: OpenaiService,
    private readonly cardService: CardService,
  ) {}

  async readTarot(): Promise<{
    card: Card;
    content: CardContent;
  }> {
    const newCardChance =
      this.config.get<EnvConfig['newCardChance']>('newCardChance');
    const maxCardContents =
      this.config.get<EnvConfig['maxCardContents']>('maxCardContents');

    const card = await this.cardService.getCards().then((cards) => {
      return cards[Math.floor(Math.random() * cards.length)];
    });
    const existingCardContents = await this.cardService.getCardContents({
      cardId: card.id,
    });

    // The more existing contents a card has, the less likely it is to generate a new one
    const maxExistingCardRatio = existingCardContents.length / maxCardContents;
    // The chance of generating a new card is reduced by the ratio of existing contents
    const modifiedNewCardChance = newCardChance * (1 - maxExistingCardRatio);

    const chance = Math.random();
    console.log(chance);
    console.log(modifiedNewCardChance);

    // If there are no existing contents or the random number is less than the modified chance, generate a new content
    if (existingCardContents.length === 0 || chance < modifiedNewCardChance) {
      const { keywords, advice } = await this.generateCardContents(card.title);
      const createdContent = await this.cardService.createCardContent({
        cardId: card.id,
        keywords,
        advice,
      });
      return { card, content: createdContent };
    } else {
      // Otherwise, return a random existing content
      return {
        card,
        content:
          existingCardContents[
            Math.floor(Math.random() * existingCardContents.length)
          ],
      };
    }
  }

  private async generateCardContents(cardname: string) {
    const keywords = await this.openai.generateKeywords(cardname);
    const advice = await this.openai.generateAdvice(keywords);
    return { keywords, advice };
  }
}
