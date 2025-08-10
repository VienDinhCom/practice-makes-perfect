import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const queryClient = new QueryClient();

export const Route = createFileRoute(
  "/29-invalidating-and-refetching-inactive-queries",
)({
  component: Lesson,
});

function Lesson() {
  const [show, toggle] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <button onClick={() => toggle(!show)}>Toggle</button>
      <button
        onClick={() =>
          queryClient.invalidateQueries({
            queryKey: ["time"],
            refetchType: "inactive", // refetch inactive queries
          })
        }
      >
        Invalidate
      </button>
      <br />
      <br />
      {show && <Time />}
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
    staleTime: Infinity,
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
