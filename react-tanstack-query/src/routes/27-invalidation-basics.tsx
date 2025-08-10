import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const Route = createFileRoute("/27-invalidation-basics")({
  component: Lesson,
});

function Lesson() {
  return (
    <QueryClientProvider client={queryClient}>
      <Time />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Time() {
  const timeQuery = useQuery({
    queryKey: ["time"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return new Date().toLocaleTimeString();
    },
  });

  if (timeQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {timeQuery.data} {timeQuery.isFetching ? "..." : ""}
      <br />
      <br />
      <button onClick={() => timeQuery.refetch()}>Refetch</button>
      <button
        onClick={() => queryClient.invalidateQueries({ queryKey: ["time"] })}
      >
        Invalidate
      </button>
    </div>
  );
}
