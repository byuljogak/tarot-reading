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

  async readCard({ title }: { title: string }) {
    return this.prisma.card.findUnique({
      where: {
        title,
      },
    });
  }

  async readAllCards() {
    return this.prisma.card.findMany();
  }

  async readCardContent({ cardContentId }: { cardContentId: string }) {
    return this.prisma.cardContent.findUnique({
      where: {
        id: cardContentId,
      },
    });
  }

  async readCardContents({ cardId }: { cardId: string }) {
    return this.prisma.cardContent.findMany({
      where: {
        cardId,
      },
    });
  }

  async updateCardTitle({
    cardId,
    title,
    titleKr,
  }: {
    cardId: string;
    title?: string;
    titleKr?: string;
  }) {
    return this.prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        title,
        title_kr: titleKr,
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

  async deleteCard({ id }: { id: string }) {
    return this.prisma.card.delete({
      where: {
        title: id,
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
