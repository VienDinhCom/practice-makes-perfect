import { createFileRoute } from '@tanstack/react-router';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { useState } from "react";

const queryClient = new QueryClient();

export const Route = createFileRoute('/13-props-and-state')({
  component: Lesson,
});

function Lesson() {
  const [pokemon, setPokemon] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <input
        type="text"
        value={pokemon}
        onChange={(e) => setPokemon(e.target.value)}
      />
      <SearchPokemon pokemon={pokemon} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

interface Data {
  name: string;
  sprites: {
    front_default: string;
  };
}

function SearchPokemon(props: { pokemon: string }) {
  const queryInfo = useQuery({
    queryKey: [props.pokemon],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const pokemon = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`)
        .then((res) => res.data as Data);

      return pokemon;
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
      {queryInfo.data?.sprites?.front_default ? (
        <img src={queryInfo.data?.sprites?.front_default} />
      ) : (
        "Pokemon not found"
      )}
    </div>
  );
}
