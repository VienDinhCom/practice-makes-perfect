import { createFileRoute } from '@tanstack/react-router';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createFileRoute('/01-setup')({
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
  return <div>Hello React Query</div>;
}
