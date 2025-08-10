import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

export const Route = createFileRoute("/44-prefetching-paginated-queries")({
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

async function fetchPosts(page: number) {
  return axios
    .get("https://pokeapi.co/api/v2/pokemon", {
      params: { limit: 10, offset: page },
    })
    .then((res) => res.data);
}

function Posts() {
  const [page, setPage] = useState(0);

  const postsQuery = useQuery({
    queryKey: ["posts", { page }],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data = fetchPosts(page);

      return data;
    },
    placeholderData: keepPreviousData, // keep previous data when refetching
  });

  useEffect(() => {
    if (postsQuery.data?.next) {
      fetchPosts(page + 1).then((data) => {
        queryClient.setQueryData(["posts", { page: page + 1 }], data);
      });
    }
  }, [postsQuery.data?.next, page]);

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
