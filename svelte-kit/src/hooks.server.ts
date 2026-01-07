// import * as Sentry from '@sentry/sveltekit';
import { building } from '$app/environment';
import { auth } from '$lib/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const authHandle: Handle = async ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth, building });
};

const sessionHandle: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({
		headers: event.request.headers
	});
	event.locals.user = session?.user;
	const response = await resolve(event);
	return response;
};

// export const log: Handle = async ({ event, resolve }) => {
// 	console.log('Before Page hit');
// 	const response = await resolve(event);
// 	console.log('After Page hit');
// 	return response;
// };
// export const log_two: Handle = async ({ event, resolve }) => {
// 	console.log('Before LOG 2 Page hit');
// 	const response = await resolve(event);
// 	console.log('After LOG 2 Page hit');
// 	return response;
// };

export const handle = sequence(authHandle, sessionHandle);
