import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";

const queryClient = new QueryClient();

export const Route = createFileRoute("/45-infinite-queries")({
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

async function fetchPosts(url: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return axios.get(url).then((res) => res.data);
}

function Posts() {
  const postsQuery = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0",
    getNextPageParam: (lastPage) => lastPage.next,
    // getPreviousPageParam: (firstPage) => firstPage.prev,
  });

  if (postsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (postsQuery.isError) {
    return <div>Error: {postsQuery.error.message}</div>;
  }

  console.log(postsQuery.data);

  return (
    <div>
      {/*<pre>{JSON.stringify(postsQuery.data, null, 2)}</pre>*/}

      <ul>
        {postsQuery.data?.pages.flatMap((page) => {
          return page.results.map((post: any) => (
            <li key={post.id}>{post.name}</li>
          ));
        })}
      </ul>
      <button
        onClick={() => postsQuery.fetchNextPage()}
        disabled={!postsQuery.hasNextPage}
      >
        Load More
      </button>
    </div>
  );
}
