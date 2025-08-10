import { createFileRoute } from '@tanstack/react-router';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const queryClient = new QueryClient();

export const Route = createFileRoute('/17-query-cancellation')({
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

// https://tanstack.com/query/latest/docs/framework/react/guides/query-cancellation

function SearchPokemon(props: { pokemon: string }) {
  const queryInfo = useQuery({
    queryKey: ["pokemon", props.pokemon],
    queryFn: async ({ signal }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.pokemon}`,
        {
          method: "GET",
          signal,
        },
      ).then((res) => res.json() as Promise<Data>);

      return data;
    },
    enabled: props.pokemon !== "",
  });

  // const queryInfo = useQuery({
  //   queryKey: ["pokemon", props.pokemon],
  //   queryFn: async ({ signal }) => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     const data = await axios
  //       .get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`, {
  //         signal,
  //       })
  //       .then((res) => res.data as Data);

  //     return data;
  //   },
  //   enabled: props.pokemon !== "",
  // });

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
