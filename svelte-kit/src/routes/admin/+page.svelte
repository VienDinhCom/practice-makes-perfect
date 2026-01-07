<script lang="ts">
	import { resolve } from '$app/paths';
	import { get_all_posts } from './posts.remote';
</script>

<a class="button" href={resolve('/admin/post/new')}>New Post</a>

<ol>
	{#each await get_all_posts() as post (post.id)}
		<li>
			<a href={resolve(`/admin/post/${post.id}`)}>{post.title}</a>
		</li>
	{/each}
</ol>
