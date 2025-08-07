import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const Route = createFileRoute(
  "/30-invalidating-multiple-queries-with-similar-query-keys",
)({
  component: Lesson,
});

function Lesson() {
  return (
    <QueryClientProvider client={queryClient}>
      <button
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey: ["time"],
          })
        }
      >
        Invalidate
      </button>
      <br />
      <br />
      <Time subKey="a" />
      <Time subKey="b" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function Time(props: { subKey: string }) {
  const timeQuery = useQuery({
    queryKey: ["time", props.subKey],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 3000));
      return new Date().toLocaleTimeString();
    },
  });

  if (timeQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {timeQuery.data} {timeQuery.isFetching ? "..." : ""}
    </div>
  );
}
