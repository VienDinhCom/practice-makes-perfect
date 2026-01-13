import { useEffect, useRef, useState } from "react";
import { createWebSocket } from "../lib/socket";
import type { User, Chat, Socket } from "../../shared/types";
import { capitalize } from "@esmate/utils";

interface Message {
  id: string;
  text: string;
  type: "sent" | "received";
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState("Connecting...");
  const wsRef = useRef<WebSocket | null>(null);
  const myIdShortRef = useRef<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const ws = createWebSocket();
    wsRef.current = ws;

    ws.onopen = () => setStatus("Connected");
    ws.onclose = () => setStatus("Disconnected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as Socket<User | Chat>;

      if (data.type === "user") {
        myIdShortRef.current = (data.payload as User).id;
        return;
      }

      if (data.type === "chat") {
        const chat = data.payload as Chat;
        const isMe = chat.userId === myIdShortRef.current;

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            type: isMe ? "sent" : "received",
            text: isMe
              ? `Me: ${chat.message}`
              : `${capitalize(chat.userId)}: ${chat.message}`,
          },
        ]);
      }
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (!inputValue.trim() || !wsRef.current) return;

    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          userId: myIdShortRef.current,
          message: inputValue,
        },
      })
    );

    setInputValue("");
  };

  return (
    <div className="flex h-screen w-full flex-col border border-gray-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-semibold">WebSocket Chat</h1>
        <span
          className={`text-sm ${
            status === "Connected" ? "text-green-600" : "text-gray-500"
          }`}
        >
          {status}
        </span>
      </header>

      <ul className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {messages.map((msg) => (
          <li
            key={msg.id}
            className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
              msg.type === "sent"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-gray-100 text-gray-900"
            }`}
          >
            {msg.text}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>

      <div className="flex items-center gap-2 border-t px-4 py-3">
        <input
          className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type a message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 active:bg-blue-800"
        >
          Send
        </button>
      </div>
    </div>
  );
}
