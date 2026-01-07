<script lang="ts">
	import { page } from '$app/state';
	import { get_post_by_id, update_post } from '../../posts.remote';

	const post = await get_post_by_id(page.params.id!);
</script>

<form {...update_post}>
	<div class="row">
		<label>
			Id:
			<br />
			<input {...update_post.fields.id.as('text')} readonly value={post?.id} />
		</label>
	</div>
	<div class="row">
		<label>
			Title:
			<br />
			<input {...update_post.fields.title.as('text')} value={post?.title} />
		</label>
		{#each update_post.fields.title.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
	</div>
	<div class="row">
		<label
			>Body: <br />
			<textarea {...update_post.fields.body.as('text')} value={post?.body}></textarea></label
		>
	</div>
	<button type="submit">Post</button>
</form>
