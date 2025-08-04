import { createFileRoute } from '@tanstack/react-router';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();

export const Route = createFileRoute('/03-query-loading-state')({
  component: Lesson,
});

function Lesson() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemon />
    </QueryClientProvider>
  );
}

interface Data {
  name: string;
}

function Pokemon() {
  const queryInfo = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results as Data[]);
    },
  });

  return queryInfo.isLoading ? (
    "Loading..."
  ) : (
    <div>
      {queryInfo.data?.map((result) => (
        <div key={result.name}>{result.name}</div>
      ))}
    </div>
  );
}
