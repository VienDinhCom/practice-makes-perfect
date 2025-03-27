import fs from 'node:fs';
import path from 'node:path';
import { createJsonTranslator, createLanguageModel } from 'typechat';
import { processRequests } from 'typechat/interactive';
import { createTypeScriptJsonValidator } from 'typechat/ts';
import { SentimentResponse } from './schema.ts';

console.log(process.env.OPENAI_MODEL);
console.log(path.join(import.meta.dirname!, 'schema.ts'));

const model = createLanguageModel(process.env);
const schema = fs.readFileSync(path.join(import.meta.dirname!, 'schema.ts'), 'utf8');
const validator = createTypeScriptJsonValidator<SentimentResponse>(schema, 'SentimentResponse');
const translator = createJsonTranslator(model, validator);

// Process requests interactively or from the input file specified on the command line
processRequests('😀> ', process.argv[2], async (request) => {
  const response = await translator.translate(request);
  if (!response.success) {
    console.log(response.message);
    return;
  }
  console.log(`The sentiment is ${response.data.sentiment}`);
});
