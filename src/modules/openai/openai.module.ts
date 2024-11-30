import { Module } from '@nestjs/common';
import { OpenaiService } from 'src/services/oepnai/openai.service';

@Module({
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
