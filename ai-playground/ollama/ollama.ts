#!/usr/bin/env -S deno run -A

import ollama from 'npm:ollama@0';

await (async () => {
  const prompt = 'Tell a story about AI.';

  console.log('\n\n\nAsking: ' + prompt + '\n');

  const streamResponse = await ollama.chat({
    model: 'gemma3:1b',
    messages: [
      {
        role: 'system',
        content: 'You are a storyteller.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    stream: true,
  });

  for await (const chunk of streamResponse) {
    const content = chunk.message.content;

    // process.stdout.write(content);

    Deno.stdout.write(new TextEncoder().encode(content));
  }
})();

await (async () => {
  const prompt = 'Explain quantum computing in simple terms.';

  console.log('\n\n\nAsking: ' + prompt + '\n');

  const chatCompletion = await ollama.chat({
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
  });

  console.log('AI Response:', chatCompletion.message.content);
})();
