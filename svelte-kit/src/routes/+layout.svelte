<script lang="ts">
	import { resolve } from '$app/paths';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { get_user } from '$lib/remote/user.remote';
	import { authClient } from '$lib/auth-client';
	import { goto, onNavigate } from '$app/navigation';

	let { children } = $props();

	const user = $derived(await get_user());

	function logout() {
		authClient.signOut({
			fetchOptions: {
				onSuccess: async () => {
					await get_user().refresh();
					goto(resolve('/auth/login'));
				}
			}
		});
	}

	onNavigate((navigate) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigate.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="border-b border-gray-200 py-4 dark:border-gray-700">
	<div class="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4">
		<div class="flex items-center gap-4">
			<a
				href={resolve('/')}
				class="font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
				>Home</a
			>
			<a
				href={resolve('/about')}
				class="font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
				>About</a
			>
			{#if user.role === 'admin'}
				<a
					href={resolve('/admin')}
					class="font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
					>Admin</a
				>
			{/if}
		</div>
		<div class="flex items-center gap-4">
			{#if user.id}
				<span class="text-sm text-gray-600 dark:text-gray-400"
					>Welcome, <strong>{user.name}</strong></span
				>
				<button
					onclick={logout}
					class="rounded-lg bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
				>
					Logout
				</button>
			{/if}
			{#if !user.id}
				<a
					href={resolve('/auth/login')}
					class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
				>
					Login
				</a>
			{/if}
		</div>
	</div>
</header>

<main class="mx-auto max-w-4xl px-4 py-8">
	{@render children()}
</main>
