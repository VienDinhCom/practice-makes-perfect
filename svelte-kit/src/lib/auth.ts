import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { admin, createAuthMiddleware } from 'better-auth/plugins';
import { count, eq } from 'drizzle-orm';

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true
	},
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	plugins: [admin()],
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			if (ctx.path.startsWith('/sign-up')) {
				const newSession = ctx.context.newSession;

				if (newSession) {
					// Check if this is the first user
					const [result] = await db.select({ count: count() }).from(user);

					if (result.count === 1) {
						await db.update(user).set({ role: 'admin' }).where(eq(user.id, newSession.user.id));
					}
				}
			}
		})
	}
});
