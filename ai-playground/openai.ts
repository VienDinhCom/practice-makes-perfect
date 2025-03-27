import OpenAI from '@openai/openai';

const ollama = new OpenAI({
  baseURL: 'http://localhost:11434/v1', // Default Ollama endpoint
  apiKey: 'ollama', // Ollama doesn't require a real API key
  dangerouslyAllowBrowser: false,
});

async function main() {
  try {
    // const chatCompletion = await ollama.chat.completions.create({
    //   model: 'gemma3:1b',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: 'You are a helpful assistant.',
    //     },
    //     {
    //       role: 'user',
    //       content: 'Explain quantum computing in simple terms.',
    //     },
    //   ],
    //   max_tokens: 300,
    //   temperature: 0.7,
    // });

    // // Print the AI's response
    // console.log('AI Response:', chatCompletion.choices[0].message.content);

    // Stream response example
    const streamResponse = await ollama.chat.completions.create({
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
      process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the main function
main();
