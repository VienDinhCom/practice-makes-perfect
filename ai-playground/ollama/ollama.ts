#!/usr/bin/env -S deno run -A --env-file

import ollama from 'ollama';

(async () => {
  const prompt = 'Explain quantum computing in simple terms.';

  console.log('\n Asking: ' + prompt + '\n');

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
