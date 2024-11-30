import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { EnvConfig } from 'src/schemas/server_config.schema';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;

  constructor(private readonly config: ConfigService<EnvConfig, true>) {
    this.openai = new OpenAI({
      baseURL: config.get<EnvConfig['openai']>('openai').url,
      apiKey: config.get<EnvConfig['openai']>('openai').apiKey,
    });
  }

  async generateKeywords(cardname: string): Promise<string[]> {
    const response = await this.openai.chat.completions.create({
      model: this.config.get<EnvConfig['openai']>('openai').model,
      max_tokens: this.config.get<EnvConfig['openai']>('openai').maxTokens,
      messages: [
        {
          role: 'system',
          content:
            this.config.get<EnvConfig['openai']>('openai').contents.keyword,
        },
        { role: 'user', content: cardname },
      ],
    });
    console.log('generateKeywords');
    console.log(response.choices[0].message.content);

    return response.choices[0].message.content.split(', ');
  }

  async generateAdvice(keywords: string[]): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.config.get<EnvConfig['openai']>('openai').model,
      max_tokens: this.config.get<EnvConfig['openai']>('openai').maxTokens,
      messages: [
        {
          role: 'system',
          content:
            this.config.get<EnvConfig['openai']>('openai').contents.description,
        },
        { role: 'user', content: keywords.join(', ') },
      ],
    });

    return response.choices[0].message.content;
  }
}
