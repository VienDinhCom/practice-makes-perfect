import usePromise from 'react-promise-suspense';
import { onGetMe } from './index.telefunc';

export function Page() {
  const me = usePromise(onGetMe, []);

  return <h1>Home: {me?.name}</h1>;
}
