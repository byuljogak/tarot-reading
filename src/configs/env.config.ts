import { EnvConfig, EnvConfigSchema } from 'src/schemas/server_config.schema';

export function validate(raw: Record<string, unknown>): EnvConfig {
  const config: EnvConfig = {
    nodeEnv: raw.NODE_ENV as string,
    newCardChance:
      raw.NEW_CARD_CHANCE && parseFloat(raw.NEW_CARD_CHANCE as string),
    maxCardContents:
      raw.MAX_CARD_CONTENTS && parseInt(raw.MAX_CARD_CONTENTS as string),
    openai: {
      url: raw.OPENAI_API_URL as string,
      model: raw.OPENAI_MODEL as string,
      apiKey: raw.OPENAI_SECRET_KEY as string,
      maxTokens:
        raw.OPENAI_MAX_TOKENS && parseInt(raw.OPENAI_MAX_TOKENS as string),
      contents: {
        keyword: raw.OPENAI_KEYWORD_SYSTEM as string,
        description: raw.OPENAI_DESCRIPTION_SYSTEM as string,
      },
    },
  };

  const result = EnvConfigSchema.safeParse(config);

  if (!result.success) {
    throw new Error(result.error.message);
  }

  return result.data;
}
