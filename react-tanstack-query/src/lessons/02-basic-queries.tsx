import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Pokemon {
  name: string;
}

function App() {
  const queryInfo = useQuery({
    queryKey: ["pokemon"],
    queryFn: () =>
      axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results as Pokemon[]),
  });

  console.log(queryInfo);

  return (
    <div>
      {queryInfo.data?.map((result) => (
        <div key={result.name}>{result.name}</div>
      ))}
    </div>
  );
}

export default App;
