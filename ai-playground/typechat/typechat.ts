#!/usr/bin/env -S deno run -A

import { createZodJsonValidator } from 'npm:typechat@0/zod';
import { processRequests } from 'npm:typechat@0/interactive';
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

processRequests('How do you feel? ', Deno.args[1], async (request: string) => {
  const response = await translator.translate(request);

  if (response.success) {
    console.log('You are ' + response.data.sentiment + '.\n');
  } else {
    console.log(response.message);
  }
});
