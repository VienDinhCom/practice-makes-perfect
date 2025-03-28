#!/usr/bin/env -S deno run -A

import * as path from '@std/path';
import { createTypeScriptJsonValidator } from 'typechat/ts';
import { createJsonTranslator, createOpenAILanguageModel } from 'typechat';

import { SentimentResponse } from './schema.ts';

const config = {
  apiKey: 'ollama',
  model: 'gemma3:1b',
  endPoint: 'http://localhost:11434/v1/chat/completions',
};

const model = createOpenAILanguageModel(config.apiKey, config.model, config.endPoint);

const schema = Deno.readTextFileSync(path.join(import.meta.dirname!, 'schema.ts'));

const validator = createTypeScriptJsonValidator<SentimentResponse>(schema, 'SentimentResponse');
const translator = createJsonTranslator(model, validator);

const response = await translator.translate('I am sad.');

if (response.success) {
  console.log(response.data.sentiment);
} else {
  console.log('Does not work.');
}
