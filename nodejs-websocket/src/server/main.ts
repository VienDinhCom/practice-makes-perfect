import WebSocket from "ws";
import express from "express";
import expressWs from "express-ws";
import type { Request } from "express";
import type { User, Chat, Socket } from "../shared/types";
import { env } from "node:process";

const isProduction = env.NODE_ENV === "production";

const { app } = expressWs(express());

if (isProduction) {
  app.use(express.static("dist"));
}

interface ChatWebSocket extends WebSocket {
  userId: string;
}

const clients = new Set<ChatWebSocket>();

app.ws("/socket", (ws: WebSocket, _req: Request) => {
  const customWs = ws as ChatWebSocket;

  customWs.userId = Math.random().toString(36).substring(2, 4);
  console.log("a user connected", customWs.userId);
  clients.add(customWs);

  // Send ID to client so they can identify their own messages
  const userMessage: Socket<User> = {
    type: "user",
    payload: { id: customWs.userId },
  };
  customWs.send(JSON.stringify(userMessage));

  customWs.on("message", (data: string) => {
    try {
      const parsed = JSON.parse(data) as Socket<Chat>;

      if (parsed.type === "chat") {
        console.log(
          `Received message from ${customWs.userId}: ${parsed.payload.message}`
        );

        // Broadcast the message back to everyone
        const broadcastMessage: Socket<Chat> = {
          type: "chat",
          payload: {
            userId: customWs.userId,
            message: parsed.payload.message,
          },
        };

        const response = JSON.stringify(broadcastMessage);
        clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(response);
          }
        });
      }
    } catch (e) {
      console.error("Failed to parse message", e);
    }
  });

  customWs.on("close", () => {
    clients.delete(customWs);
  });
});

const PORT = isProduction ? 3000 : 8080;

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
