import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { trpcServer } from "@hono/trpc-server";
import { createContext } from "./context";
import { appRouter } from "./router";

const app = new Hono();

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext,
  })
);

serve({ fetch: app.fetch, port: parseInt(process.env.PORT as string) || 3000 });
