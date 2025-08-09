import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { useState } from "react";

const queryClient = new QueryClient();

export const Route = createFileRoute("/43-paginated-queries")({
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

function Posts() {
  const [page, setPage] = useState(0);

  const postsQuery = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data = axios
        .get("https://pokeapi.co/api/v2/pokemon", {
          params: { limit: 10, offset: page },
        })
        .then((res) => res.data);

      return data;
    },
    placeholderData: keepPreviousData, // keep previous data when refetching
  });

  if (postsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (postsQuery.isError) {
    return <div>Error: {postsQuery.error.message}</div>;
  }

  return (
    <div>
      {/*<pre>{JSON.stringify(postsQuery.data, null, 2)}</pre>*/}

      <ul>
        {postsQuery.data?.results?.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>

      <div>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <button
          disabled={postsQuery.data?.next === null}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
        <button>
          Current: {page + 1} {postsQuery.isFetching && "..."}
        </button>
      </div>
    </div>
  );
}
