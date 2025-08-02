import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { shuffle } from "es-toolkit";
import { useState } from "react";

const queryClient = new QueryClient();

export function App() {
  const [show, toggle] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <button onClick={() => toggle((prev) => !prev)}>
        {show ? "Hide" : "Show"}
      </button>
      <br />
      {show && <Pokemon />}
      <ReactQueryDevtools initialIsOpen={false} />
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

      const pokemons = await axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results as Data[]);

      return shuffle(pokemons);
    },
    gcTime: 5000, // cache time: default is 5 minutes
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
