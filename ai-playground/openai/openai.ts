#!/usr/bin/env -S deno run -A --env-file

import OpenAI from '@openai/openai';

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
  // dangerouslyAllowBrowser: false,
});

await (async () => {
  const prompt = 'Explain quantum computing in simple terms.';

  console.log('\n Asking: ' + prompt + '\n');

  const streamResponse = await client.chat.completions.create({
    model: 'gemma3:1b',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 300,
    temperature: 0.7,
  });

  for await (const chunk of streamResponse) {
    const content = chunk.choices[0]?.delta?.content || '';

    // process.stdout.write(content);

    Deno.stdout.write(new TextEncoder().encode(content));
  }
})();

await (async () => {
  const prompt = 'Explain quantum computing in simple terms.';

  console.log('\n Asking: ' + prompt + '\n');

  const chatCompletion = await client.chat.completions.create({
    model: 'gemma3:1b',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 300,
    temperature: 0.7,
  });

  console.log('AI Response:', chatCompletion.choices[0].message.content);
})();
