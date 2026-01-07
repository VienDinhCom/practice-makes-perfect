<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { get_user } from '../../user.remote';

	let error = $state('');

	async function login(e: Event) {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const email = form.email.value;
		const password = form.password.value;

		if (!email || !password) {
			error = 'All fields are required';
			return;
		}

		await authClient.signIn.email(
			{
				email,
				password
			},
			{
				onSuccess: async () => {
					// what you want to do on success
					get_user().refresh();
					goto(resolve('/'));
				}
			}
		);
	}
</script>

<div class="mx-auto max-w-md">
	<div
		class="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
	>
		<h1 class="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Login</h1>

		<form onsubmit={login} class="space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Email
				</label>
				<input
					required
					type="email"
					id="email"
					class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					placeholder="you@example.com"
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
					Password
				</label>
				<input
					required
					type="password"
					id="password"
					class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
					placeholder="••••••••"
				/>
			</div>

			{#if error}
				<div class="rounded-lg bg-red-50 p-3 dark:bg-red-900/30">
					<p class="text-sm text-red-600 dark:text-red-400">{error}</p>
				</div>
			{/if}

			<button
				type="submit"
				class="w-full rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
			>
				Sign in
			</button>
		</form>
	</div>

	<p class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
		Don't have an account?
		<a
			href={resolve('/auth/signup')}
			class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
		>
			Sign up
		</a>
	</p>
</div>
