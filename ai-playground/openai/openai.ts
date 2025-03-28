#!/usr/bin/env -S deno run -A --env-file

import OpenAI from '@openai/openai';

const client = new OpenAI({
  baseURL: 'http://localhost:11434/v1',
  apiKey: 'ollama',
  dangerouslyAllowBrowser: false,
});

(async () => {
  const streamResponse = await client.chat.completions.create({
    model: 'gemma3:1b',
    messages: [
      {
        role: 'user',
        content: 'Tell me a short story about a robot.',
      },
    ],
    stream: true,
  });

  for await (const chunk of streamResponse) {
    const encoder = new TextEncoder();
    const content = chunk.choices[0]?.delta?.content || '';
    const data = encoder.encode(content);

    Deno.stdout.write(data);
  }
})();

(async () => {
  const chatCompletion = await client.chat.completions.create({
    model: 'gemma3:1b',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: 'Explain quantum computing in simple terms.',
      },
    ],
    max_tokens: 300,
    temperature: 0.7,
  });

  console.log('AI Response:', chatCompletion.choices[0].message.content);
})();
