import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export const Route = createFileRoute("/31-basic-query-prefetching")({
  component: Lesson,
});

async function fetchPosts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  return res.json();
}

function Lesson() {
  const [show, toggle] = useState(false);

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <button onClick={() => toggle(!show)}>{show ? "Hide" : "Show"}</button>
      {show && <Posts />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Posts() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (postsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (postsQuery.isError) {
    return <div>Error: {postsQuery.error.message}</div>;
  }

  return (
    <ul>
      {postsQuery.data?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
