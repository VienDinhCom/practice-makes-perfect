#!/usr/bin/env -S deno run -A --watch

// Deno.env.set('PROXY_API_KEY', 'ollama');
// Deno.env.set('OPENAI_API_KEY', 'ollama');
// Deno.env.set('OPENAI_API_HOST', 'localhost:11434');

const PROXY_API_KEY = Deno.env.get('PROXY_API_KEY');
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const OPENAI_API_HOST = Deno.env.get('OPENAI_API_HOST') || 'api.openai.com';

Deno.serve((req) => {
  const bearer = 'Bearer ';
  const proxyApiKey = req.headers.get('authorization')?.replace(bearer, '');

  if (proxyApiKey !== PROXY_API_KEY) {
    return new Response('Incorrect API key provided: ' + proxyApiKey, { status: 401 });
  }

  const { host, href } = new URL(req.url);

  const url = href.replace(host, OPENAI_API_HOST);

  return fetch(url, {
    body: req.body,
    method: req.method,
    headers: {
      ...req.headers,
      host: OPENAI_API_HOST,
      authorization: bearer + OPENAI_API_KEY,
    },
  });
});
