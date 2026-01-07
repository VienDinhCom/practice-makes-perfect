<script lang="ts">
	import { resolve } from '$app/paths';
	import { get_all_posts } from './admin/posts.remote';
</script>

<section class="stack">
	{#each await get_all_posts() as post (post.id)}
		<a href={resolve(`/post/${post.slug}`)}>
			<div class="box-1">
				<h2 style:view-transition-name={`heading-${post.slug}`}>{post.title}</h2>
			</div>
		</a>
	{/each}
</section>
