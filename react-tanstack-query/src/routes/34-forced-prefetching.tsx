import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const queryClient = new QueryClient();

export const Route = createFileRoute("/34-forced-prefetching")({
  component: Lesson,
});

function Lesson() {
  const [postId, setPostId] = useState(-1);

  return (
    <QueryClientProvider client={queryClient}>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Posts(props: { setPostId: (id: number) => void }) {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);

      return res.json();
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
        {postsQuery.data.map((post) => (
          <li
            key={post.id}
            onMouseEnter={() =>
              queryClient.prefetchQuery({
                queryKey: ["post", post.id],
                queryFn: () => fetchPost(post.id),
              })
            }
          >
            <a href="#" onClick={() => props.setPostId(post.id)}>
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

async function fetchPost(postId: number) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );

  return await res.json();
}

function Post(props: { postId: number; setPostId: (id: number) => void }) {
  const postQuery = useQuery({
    queryKey: ["post", props.postId],
    queryFn: async () => fetchPost(props.postId),
    staleTime: 60 * 1000,
  });

  if (postQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (postQuery.isError) {
    return <div>Error: {postQuery.error.message}</div>;
  }

  return (
    <div>
      {postQuery.isFetching ? (
        "Updating..."
      ) : (
        <button onClick={() => props.setPostId(-1)}>Back</button>
      )}
      <br />
      <h1>{postQuery.data.title}</h1>
      <p>{postQuery.data.body}</p>
    </div>
  );
}
