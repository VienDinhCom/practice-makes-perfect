"use server";

import { payload } from "./payload";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { login, logout } from "@payloadcms/next/auth";
import config from "@payload-config";

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

export async function signIn({ email, password }: Pick<Auth, "email"> & { password: string }) {
  const result = await login({
    collection: "users",
    config,
    email,
    password,
  });

  return result;
}

export async function signUp(user: Pick<Auth, "name" | "email"> & { password: string }) {
  const result = await payload.create({
    collection: "users",
    data: user,
  });

  await signIn({ email: user.email, password: user.password });

  return result;
}

export async function signOut() {
  const result = await logout({ allSessions: true, config });

  return result;
}
