import { createFileRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createFileRoute("/25-scroll-restoration")({
  component: Lesson,
});

function Lesson() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemon />
    </QueryClientProvider>
  );
}

function Pokemon() {
  return (
    <div>
      React Query automatically supports scroll restoration when data in cache.
    </div>
  );
}
