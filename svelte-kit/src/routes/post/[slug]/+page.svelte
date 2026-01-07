<script lang="ts">
	import { page } from '$app/state';
	import { get_post_by_slug } from '../../admin/posts.remote';

	const post = await get_post_by_slug(page.params.slug!);
</script>

{#if post}
	<section>
		<h1 style:view-transition-name={`heading-${post.slug}`}>{post.title}</h1>
		<p>{post.body}</p>
	</section>
{/if}
