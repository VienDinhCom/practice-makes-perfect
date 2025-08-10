import { createFileRoute } from '@tanstack/react-router';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { shuffle } from "es-toolkit";

const queryClient = new QueryClient();

export const Route = createFileRoute('/12-parallel-queries')({
  component: Lesson,
});

function Lesson() {
  return (
    <QueryClientProvider client={queryClient}>
      <Berries queryKey="berries" />
      <Pokemon queryKey="pokemons" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

interface Data {
  name: string;
}

function Berries(props: { queryKey: string }) {
  const queryInfo = useQuery({
    queryKey: [props.queryKey],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pokemons = await axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results as Data[]);

      return shuffle(pokemons);
    },
  });

  return queryInfo.isLoading ? (
    "Loading..."
  ) : queryInfo.isError ? (
    queryInfo.error?.message
  ) : (
    <div>
      {queryInfo.isFetching && <div>Updatding...</div>}
      <br />
      {queryInfo.data?.map((result) => (
        <div key={result.name}>{result.name}</div>
      ))}
    </div>
  );
}

function Pokemon(props: { queryKey: string }) {
  const queryInfo = useQuery({
    queryKey: [props.queryKey],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pokemons = await axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results as Data[]);

      return shuffle(pokemons);
    },
  });

  return queryInfo.isLoading ? (
    "Loading..."
  ) : queryInfo.isError ? (
    queryInfo.error?.message
  ) : (
    <div>
      {queryInfo.isFetching && <div>Updatding...</div>}
      <br />
      {queryInfo.data?.map((result) => (
        <div key={result.name}>{result.name}</div>
      ))}
    </div>
  );
}
