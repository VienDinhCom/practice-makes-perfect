import { useParams } from 'react-router-dom';

export function Page() {
  const { listId } = useParams();

  return <h1>List: {listId}</h1>;
}
