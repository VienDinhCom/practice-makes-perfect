import invariant from 'tiny-invariant';
import firebase from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp } from 'firebase-admin/app';
import { database, User } from '@app/database';

const app = initializeApp({
  credential: firebase.credential.cert(JSON.parse(process.env.NODE_FIREBASE_CONFIG as string)),
});

export const serverAuth = getAuth(app);

export * from 'firebase/auth';

export async function upsertAuthUser(authorization: string): Promise<User> {
  const { email, email_verified, picture } = await serverAuth.verifyIdToken(authorization);

  invariant(email, 'email does not exist');

  const { displayName } = await serverAuth.getUserByEmail(email);

  const name = displayName || email.split('@')[0];
  const verified = Boolean(email_verified);
  const image = picture || `https://ui-avatars.com/api/?name=${name}`;

  return database.user.upsert({
    where: { email },
    create: { email, name, verified, image },
    update: { email, name, verified, image },
  });
}

export async function getAuthUser(authorization: string): Promise<User> {
  const { email } = await serverAuth.verifyIdToken(authorization);

  invariant(email, 'email does not exist');

  return database.user.findUniqueOrThrow({ where: { email } });
}
