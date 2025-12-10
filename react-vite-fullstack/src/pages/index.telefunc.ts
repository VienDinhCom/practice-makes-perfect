import { getContext } from 'telefunc';

export async function onGetMe() {
  const { me } = getContext();
  return me;
}
