#!/usr/bin/env -S deno run -A

// Secure API key configuration
const PROXY_API_KEY = Deno.env.get('PROXY_API_KEY') || '';
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || '';
const ALLOWED_ORIGIN = Deno.env.get('ALLOWED_ORIGIN') || '*';

const OPENAI_BASE_URL = 'https://api.openai.com/v1';

// Helper function to validate request
function validateRequest(req: Request, proxySecret: string): boolean {
  // Check for proxy secret in Authorization header
  const authHeader = req.headers.get('Authorization');
  return authHeader === `Bearer ${proxySecret}`;
}

// Helper function to create CORS headers
function createCorsHeaders(origin: string): Headers {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return headers;
}

Deno.serve(async (req) => {
  // Handle preflight CORS requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: createCorsHeaders(ALLOWED_ORIGIN),
      status: 204,
    });
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Validate proxy secret if set
  if (PROXY_API_KEY && !validateRequest(req, PROXY_API_KEY)) {
    return new Response('Unauthorized', {
      status: 401,
      headers: createCorsHeaders(ALLOWED_ORIGIN),
    });
  }

  try {
    // Extract the original path and body
    const url = new URL(req.url);
    const path = url.pathname.replace('/proxy', '');
    const body = await req.json();

    // Create the proxy request to OpenAI
    const proxyReq = await fetch(`${OPENAI_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    // Get the response from OpenAI
    const proxyRes = await proxyReq.json();

    // Create response with CORS headers
    const headers = createCorsHeaders(ALLOWED_ORIGIN);
    headers.set('Content-Type', 'application/json');

    return new Response(JSON.stringify(proxyRes), {
      headers,
      status: proxyReq.status,
    });
  } catch (error) {
    console.error('Proxy error:', error);

    const headers = createCorsHeaders(ALLOWED_ORIGIN);

    headers.set('Content-Type', 'application/json');

    return new Response(
      JSON.stringify({
        error: 'Proxy request failed',
        details: (error as { message: string }).message,
      }),
      {
        headers,
        status: 500,
      }
    );
  }
});
