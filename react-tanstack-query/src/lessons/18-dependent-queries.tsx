import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Posts />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const email = "Sincere@april.biz";

function Posts() {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?email=${email}`,
      );

      const data = await res.json();

      return data[0];
    },
  });

  const postsQuery = useQuery({
    queryKey: ["posts", userQuery.data?.id],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userQuery.data?.id}`,
      );
      return res.json();
    },
    enabled: !!userQuery.data?.id, // Only fetch if user exists
  });

  if (userQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (userQuery.isError) {
    return <div>Error: {userQuery.error.message}</div>;
  }

  return (
    <div>
      <h1>{userQuery.data.name}'s Posts</h1>
      <ul>
        {(() => {
          if (postsQuery.isLoading) {
            return <li>Loading...</li>;
          }

          if (postsQuery.isError) {
            return <li>Error: {postsQuery.error.message}</li>;
          }

          return postsQuery.data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ));
        })()}
      </ul>
    </div>
  );
}
