import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp(JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG));

export const clientAuth = getAuth(app);

export * from 'firebase/auth';
