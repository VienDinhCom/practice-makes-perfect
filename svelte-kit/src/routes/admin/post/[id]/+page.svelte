<script lang="ts">
	import { page } from '$app/state';
	import { get_post_by_id, update_post } from '../../posts.remote';

	const post = await get_post_by_id(page.params.id!);
</script>

<div
	class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
>
	<h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Edit Post</h1>

	<form {...update_post} class="space-y-4">
		<div>
			<label for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				ID
			</label>
			<input
				{...update_post.fields.id.as('text')}
				readonly
				value={post?.id}
				class="mt-1 block w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-gray-500 shadow-sm dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"
			/>
		</div>

		<div>
			<label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Title
			</label>
			<input
				{...update_post.fields.title.as('text')}
				value={post?.title}
				class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			/>
			{#each update_post.fields.title.issues() as issue (issue.message)}
				<p class="mt-1 text-sm text-red-600 dark:text-red-400">{issue.message}</p>
			{/each}
		</div>

		<div>
			<label for="body" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
				Body
			</label>
			<textarea
				{...update_post.fields.body.as('text')}
				value={post?.body}
				rows="6"
				class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
			></textarea>
		</div>

		<div class="pt-2">
			<button
				type="submit"
				class="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
			>
				Update Post
			</button>
		</div>
	</form>
</div>
