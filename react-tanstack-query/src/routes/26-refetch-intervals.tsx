import { createFileRoute } from "@tanstack/react-router";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createFileRoute("/26-refetch-intervals")({
  component: Lesson,
});

function Lesson() {
  return (
    <QueryClientProvider client={queryClient}>
      <Time />
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
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  if (timeQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{timeQuery.data}</div>;
}
