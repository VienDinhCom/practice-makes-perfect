import { z } from 'npm:zod@3';

export const SentimentResponse = z.object({
  sentiment: z.enum(['negative', 'neutral', 'positive']).describe('The sentiment of the text'),
});

export const SentimentSchema = {
  SentimentResponse,
};
