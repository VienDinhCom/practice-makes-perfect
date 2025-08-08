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

export const Route = createFileRoute("/36-mutations-with-the-usemutation-hook")({
  component: Lesson,
});

function Lesson() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const posts = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
];

function Posts() {
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
            <a href="#">{post.title}</a>
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
      </form>
    </div>
  );
}
