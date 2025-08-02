import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemon />
    </QueryClientProvider>
  );
}

function Pokemon() {
  console.log(useQuery);

  return <div>Hello React Query</div>;
}
