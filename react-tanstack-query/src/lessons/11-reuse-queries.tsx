import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { shuffle } from "es-toolkit";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Count />
      <Pokemon />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

interface Data {
  name: string;
}

function usePokemons() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pokemons = await axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results as Data[]);

      return shuffle(pokemons);
    },
  });
}

function Pokemon() {
  const queryInfo = usePokemons();

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

function Count() {
  const queryInfo = usePokemons();

  return <h3>You are looking at {queryInfo.data?.length} pokemons</h3>;
}
