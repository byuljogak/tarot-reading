import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './configs/env.config';
import { CardModule } from './modules/card.module';
import { TarotModule } from './modules/tarot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validate,
      isGlobal: true,
    }),
    PrismaModule,
    CardModule,
    TarotModule,
  ],
})
export class AppModule {}
