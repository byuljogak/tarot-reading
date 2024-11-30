import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

  async createCard({ title, titleKr }: { title: string; titleKr: string }) {
    return this.prisma.card.create({
      data: {
        title,
        title_kr: titleKr,
      },
    });
  }

  async createCardContent({
    cardId,
    keywords,
    advice,
  }: {
    cardId: string;
    keywords: string[];
    advice: string;
  }) {
    return this.prisma.cardContent.create({
      data: {
        cardId,
        keywords,
        advice,
      },
    });
  }

  async createCardContents({
    cardId,
    contents,
  }: {
    cardId: string;
    contents: { keywords: string[]; advice: string }[];
  }) {
    return this.prisma.cardContent.createMany({
      data: contents.map((content) => ({
        cardId,
        keywords: content.keywords,
        advice: content.advice,
      })),
    });
  }

  async getCard({ title }: { title: string }) {
    return this.prisma.card.findUnique({
      where: {
        title,
      },
    });
  }

  async getCards() {
    return this.prisma.card.findMany();
  }

  async getCardContent({ cardContentId }: { cardContentId: string }) {
    return this.prisma.cardContent.findUnique({
      where: {
        id: cardContentId,
      },
    });
  }

  async getCardContents({ cardId }: { cardId: string }) {
    return this.prisma.cardContent.findMany({
      where: {
        cardId,
      },
    });
  }

  async updateCardTitle({
    targetTitle,
    title,
    title_kr,
  }: {
    targetTitle: string;
    title?: string;
    title_kr?: string;
  }) {
    return this.prisma.card.update({
      where: {
        title: targetTitle,
      },
      data: {
        title,
        title_kr,
      },
    });
  }

  async updateCardContent({
    cardContentId,
    keywords,
    advice,
  }: {
    cardContentId: string;
    keywords: string[];
    advice: string;
  }) {
    return this.prisma.cardContent.update({
      where: {
        id: cardContentId,
      },
      data: {
        keywords,
        advice,
      },
    });
  }

  async deleteCard({ title }: { title: string }) {
    return this.prisma.card.delete({
      where: {
        title,
      },
    });
  }

  async deleteCardContent({ cardContentId }: { cardContentId: string }) {
    return this.prisma.cardContent.delete({
      where: {
        id: cardContentId,
      },
    });
  }
}
