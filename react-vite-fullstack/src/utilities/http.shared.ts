import retry from 'async-retry';

interface PostInput {
  url: string;
  data?: unknown;
}

interface PostInput {
  url: string;
  data?: unknown;
}

async function post<T>({ url, data }: PostInput): Promise<T> {
  return retry(
    async () => {
      const res = await fetch(url, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
      });

      if (res.ok) return res.json();

      throw new Error(await res.text());
    },
    { retries: 3 }
  );
}

export const http = { post };
