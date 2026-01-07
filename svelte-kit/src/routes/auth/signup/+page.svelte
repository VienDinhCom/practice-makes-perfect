<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { get_user } from '../../user.remote';

	let error = $state('');

	async function signup(e: Event) {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const username = form.username.value;
		const email = form.email.value;
		const password = form.password.value;
		const password_confirm = form.password_confirm.value;

		if (password !== password_confirm) {
			error = "Passwords don't match";
			return;
		}
		if (!username || !email || !password || !password_confirm) {
			error = 'All fields are required';
			return;
		}

		await authClient.signUp.email(
			{
				email,
				password,
				name: username
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

<div class="box-1">
	<h1>Sign Up</h1>
	<form onsubmit={signup}>
		<div class="row">
			<label>
				Username:
				<input required type="text" id="username" />
			</label>
		</div>
		<div class="row">
			<label>
				Email:
				<input required type="email" id="email" />
			</label>
		</div>
		<div class="row">
			<label>
				Password:
				<input required type="password" id="password" />
			</label>
		</div>
		<div class="row">
			<label>
				Confirm Passowrd:
				<input required type="password" id="password_confirm" />
			</label>
		</div>
		{#if error}
			<p style:color="var(--red);">{error}</p>
		{/if}
		<button type="submit">Sign Up</button>
	</form>
</div>

<p>
	Already have an account? <a href={resolve('/auth/login')}>Login</a>
</p>
