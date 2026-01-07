<script lang="ts">
	import { create_post } from '../../posts.remote';
</script>

<form {...create_post}>
	<div class="row">
		<label>
			Title: <br />
			<input {...create_post.fields.title.as('text')} />
		</label>
		{#each create_post.fields.title.issues() as issue (issue.message)}
			<p>{issue.message}</p>
		{/each}
	</div>
	<div class="row">
		<label>Body: <br /><textarea {...create_post.fields.body.as('text')}></textarea></label>
	</div>
	<button type="submit">Post</button>
</form>
