import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Pokemon {
  name: string;
}

function App() {
  const queryInfo = useQuery({
    queryKey: ["pokemon"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      throw new Error("Something went wrong");

      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results as Pokemon[]);
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

export default App;
