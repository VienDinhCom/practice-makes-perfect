#!/usr/bin/env -S deno run -A

import { createZodJsonValidator } from 'npm:typechat@0/zod';
import { createJsonTranslator, createOpenAILanguageModel } from 'npm:typechat@0';
import { SentimentSchema } from './schema.ts';

const config = {
  apiKey: 'ollama',
  model: 'gemma3:1b',
  endPoint: 'http://localhost:11434/v1/chat/completions',
};

const model = createOpenAILanguageModel(config.apiKey, config.model, config.endPoint);
const validator = createZodJsonValidator(SentimentSchema, 'SentimentResponse');
const translator = createJsonTranslator(model, validator);

const response = await translator.translate('I am sad.');

if (response.success) {
  console.log(response.data.sentiment);
} else {
  console.log('Does not work.');
}
