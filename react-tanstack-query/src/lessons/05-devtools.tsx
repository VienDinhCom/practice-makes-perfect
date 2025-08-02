import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemon />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

interface Data {
  name: string;
}

function Pokemon() {
  const queryInfo = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results as Data[]);
    },
  });

  return queryInfo.isLoading ? (
    "Loading..."
  ) : queryInfo.isError ? (
    queryInfo.error?.message
  ) : (
    <div>
      {queryInfo.data?.map((result) => (
        <div key={result.name}>{result.name}</div>
      ))}
    </div>
  );
}
