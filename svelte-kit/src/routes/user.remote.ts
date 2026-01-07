import { getRequestEvent, query } from '$app/server';
import { auth } from '$lib/auth';

export const get_user = query(async () => {
	const event = getRequestEvent();
	const session = await auth.api.getSession({
		headers: event.request.headers
	});
	return {
		id: session?.user.id || null,
		name: session?.user.name || null,
		email: session?.user.email || null,
		role: session?.user.role || null
	};
});
