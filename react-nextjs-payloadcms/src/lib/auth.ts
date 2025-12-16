import { payload } from "./payload";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface Auth {
  id: number;
  name: string;
  email: string;
}

export async function getAuth(): Promise<Auth | null> {
  const { user } = await payload.auth({ headers: await headers() });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function getAuthOrThrow(): Promise<Auth> {
  const auth = await getAuth();

  if (!auth) throw new Error("Not authenticated");

  return auth;
}

export async function getAuthOrRedirect(redirectUrl?: string): Promise<Auth> {
  const auth = await getAuth();

  if (!auth) redirect(redirectUrl || "/auth/sign-in");

  return auth;
}
