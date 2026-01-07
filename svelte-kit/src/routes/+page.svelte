<script lang="ts">
	import { resolve } from '$app/paths';
	import { get_all_posts } from './admin/posts.remote';
</script>

<section class="space-y-4">
	{#each await get_all_posts() as post (post.id)}
		<a href={resolve(`/post/${post.slug}`)} class="block">
			<article
				class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
			>
				<h2
					class="text-xl font-semibold text-gray-900 dark:text-white"
					style:view-transition-name={`heading-${post.slug}`}
				>
					{post.title}
				</h2>
			</article>
		</a>
	{/each}
</section>
