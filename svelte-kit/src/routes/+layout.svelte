<script lang="ts">
	import { resolve } from '$app/paths';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { get_user } from './user.remote';
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

<header>
	<div class="layout-readable center split">
		<a href={resolve('/')}>Home</a>
		{#if user.role === 'admin'}
			<a href={resolve('/admin')}>Admin</a>
		{/if}
		{#if user.id}
			Name: {user.name}
			<button onclick={logout}>Logout</button>
		{/if}
		{#if !user.id}
			<a href={resolve('/auth/login')}>Login</a>
		{/if}
	</div>
</header>

<main class="layout-readable center">
	{@render children()}
</main>

<style>
	header {
		border-bottom: solid 1px var(--tint-or-shade);
		.layout-readable {
			align-items: center;
		}
		padding-block: var(--vs-s);
	}
	main {
		padding-block: var(--vs-m);
	}
</style>
