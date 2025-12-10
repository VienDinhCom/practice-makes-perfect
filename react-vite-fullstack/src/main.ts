import path from 'node:path';
import express from 'express';
import { env } from 'node:process';
import { telefunc } from 'telefunc';
import { getAuthUser, upsertAuthUser } from '@app/utilities/auth.server';

/* General
=============================================================== */
const app = express();
const port = env.PORT || 3000;
const isProduction = env.NODE_ENV === 'production';

app.use(express.text());

function throwError(error: any, res: express.Response) {
  if (error.codePrefix === 'auth') {
    res.status(401).send('Authentication failed');
  } else {
    res.status(500).send('Internal server error');
  }
}

/* Auth
=============================================================== */
app.post('/auth', async (req, res) => {
  try {
    const authorization: string = JSON.parse(req.body);

    const me = await upsertAuthUser(authorization);

    res.status(200).json(me);
  } catch (error) {
    throwError(error, res);
  }
});

/* Telefunc
=============================================================== */

app.all('/_telefunc', async (req, res) => {
  try {
    const me = await getAuthUser(req.headers.authorization as string);

    const { body, statusCode, contentType } = await telefunc({
      url: req.originalUrl,
      method: req.method,
      body: req.body,
      context: { me },
    });

    res.status(statusCode).type(contentType).send(body);
  } catch (error) {
    throwError(error, res);
  }
});

/* Vite
=============================================================== */
if (isProduction) {
  const clientDir = path.join(process.cwd(), 'dist/client');

  app.use(express.static(clientDir));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDir, 'index.html'));
  });
} else {
  const { createServer } = await import('vite');

  const { middlewares } = await createServer({
    server: { middlewareMode: true },
  });

  app.use(middlewares);
}

app.listen(port, () => console.log('Server running at http://localhost:' + port + '\n'));
