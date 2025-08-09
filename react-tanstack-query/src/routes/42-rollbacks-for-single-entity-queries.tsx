import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const queryClient = new QueryClient();

export const Route = createFileRoute("/42-rollbacks-for-single-entity-queries")(
  {
    component: Lesson,
  },
);

function Lesson() {
  const [edit, setEdit] = useState(-1);

  return (
    <QueryClientProvider client={queryClient}>
      {edit > -1 ? (
        <Edit edit={edit} setEdit={setEdit} />
      ) : (
        <Posts setEdit={setEdit} />
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

function Edit(props: { edit: number; setEdit: (id: number) => void }) {
  const [post, setPost] = useState("");

  const postQuery = useQuery({
    queryKey: ["post", props.edit],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const post = posts.find((post) => post.id === props.edit);

      setPost(post?.title || "");

      return post;
    },
  });

  const postMutation = useMutation({
    mutationFn: async (post: { id: number; title: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      throw new Error("something went wrong");

      const index = posts.findIndex((post) => post.id === props.edit);

      if (index > -1) {
        posts[index] = post;
      }
    },
    onMutate: (post) => {
      // queryClient.cancelQueries({ queryKey: ["post", props.edit] });

      const oldPost = queryClient.getQueryData(["post", props.edit]);

      queryClient.setQueryData(["post", props.edit], () => post);

      return () =>
        queryClient.setQueryData(["post", props.edit], () => oldPost);
    },

    onError: (error, values, rollback) => {
      if (typeof rollback === "function") {
        rollback();
      }
    },
    onSuccess: (data, post) => {
      // postQuery.refetch();

      queryClient.setQueryData(["post", props.edit], () => post);
      queryClient.invalidateQueries({ queryKey: ["post", props.edit] });

      // queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (postQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button type="button" onClick={() => props.setEdit(-1)}>
        Back
      </button>
      <br />
      <h1>
        {postQuery.data?.title} {postQuery.isFetching && "..."}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postMutation.mutate({ id: props.edit, title: post });
        }}
      >
        <input
          value={post}
          type="text"
          onChange={(e) => setPost(e.target.value)}
        />
        <button type="submit">
          {postMutation.isPending ? "Saving..." : "Save"}
        </button>
        <br />
        {postMutation.isError && postMutation.error.message}
      </form>
    </div>
  );
}

function Posts(props: { setEdit: (id: number) => void }) {
  const [post, setPost] = useState("");

  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return [...posts];
    },
  });

  const postMutation = useMutation({
    mutationFn: async (post: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      posts.push({ id: posts.length + 1, title: post });
    },
    onSuccess: () => {
      // postsQuery.refetch();
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  if (postsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (postsQuery.isError) {
    return <div>Error: {postsQuery.error.message}</div>;
  }

  return (
    <div>
      <h1>Posts {postsQuery.isFetching && "..."}</h1>
      <ul>
        {postsQuery.data?.map((post) => (
          <li key={post.id}>
            <a href="#" onClick={() => props.setEdit(post.id)}>
              {post.title}
            </a>
          </li>
        ))}
      </ul>

      <br />
      <br />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          postMutation.mutate(post);
          setPost("");
        }}
      >
        <input
          value={post}
          type="text"
          placeholder="Post title"
          onChange={(e) => setPost(e.target.value)}
        />
        <button type="submit">
          {postMutation.isPending ? "Saving..." : "Save"}
        </button>
        <br />
        {postMutation.isError && postMutation.error.message}
      </form>
    </div>
  );
}
