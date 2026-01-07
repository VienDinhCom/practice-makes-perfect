<script lang="ts">
	import { resolve } from '$app/paths';
	import { get_all_posts } from './posts.remote';
</script>

<div class="mb-6">
	<a
		href={resolve('/admin/post/new')}
		class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
			<path
				fill-rule="evenodd"
				d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
				clip-rule="evenodd"
			/>
		</svg>
		New Post
	</a>
</div>

<div class="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
	<ol class="divide-y divide-gray-200 dark:divide-gray-700">
		{#each await get_all_posts() as post (post.id)}
			<li>
				<a
					href={resolve(`/admin/post/${post.id}`)}
					class="block px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
				>
					<span class="font-medium text-gray-900 dark:text-white">{post.title}</span>
				</a>
			</li>
		{/each}
	</ol>
</div>
