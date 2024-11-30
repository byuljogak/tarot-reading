import { z } from 'zod';

export const EnvConfigSchema = z.object({
  nodeEnv: z.string().optional().default('development'),
  newCardChance: z.number().optional().default(0.1),
  maxCardContents: z.number().optional().default(10),
  openai: z.object({
    url: z.string(),
    model: z.string(),
    apiKey: z.string(),
    maxTokens: z.number(),
    contents: z.object({
      keyword: z.string(),
      description: z.string(),
    }),
  }),
});

export type EnvConfig = z.infer<typeof EnvConfigSchema>;
