import { useEffect, useRef } from "react";
import { useImmerState } from "@esmate/react/hooks";
import { useWebSocket } from "@esmate/react/ahooks";
import type { User, Chat, Socket } from "../../shared/types";
import { capitalize } from "@esmate/utils";

interface Message {
  id: string;
  text: string;
  type: "sent" | "received";
}

interface State {
  userId: string;
  input: string;
  status: string;
  messages: Message[];
}

const wsUrl = `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${
  window.location.host
}/socket`;

export function Chat() {
  const [state, setState] = useImmerState<State>({
    userId: "",
    input: "",
    messages: [],
    status: "Connecting...",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  const socket = useWebSocket(wsUrl, {
    onOpen: () =>
      setState((draft) => {
        draft.status = "Connected";
        return draft;
      }),
    onClose: () =>
      setState((draft) => {
        draft.status = "Disconnected";
        return draft;
      }),
    onMessage: (event) => {
      const data = JSON.parse(event.data) as Socket<User | Chat>;

      if (data.type === "user") {
        setState((draft) => {
          draft.userId = (data.payload as User).id;
          return draft;
        });
        return;
      }

      if (data.type === "chat") {
        const chat = data.payload as Chat;
        const isMe = chat.userId === state.userId;

        setState((draft) => {
          draft.messages.push({
            id: crypto.randomUUID(),
            type: isMe ? "sent" : "received",
            text: isMe
              ? `Me: ${chat.message}`
              : `${capitalize(chat.userId)}: ${chat.message}`,
          });
          return draft;
        });
      }
    },
  });

  useEffect(() => {
    const statusMap = {
      0: "Connecting...",
      1: "Connected",
      2: "Disconnecting...",
      3: "Disconnected",
    };

    setState((draft) => {
      draft.status = statusMap[socket.readyState as keyof typeof statusMap];
      return draft;
    });
  }, [socket.readyState, setState]);

  const sendMessage = () => {
    if (!state.input.trim()) return;

    socket.sendMessage(
      JSON.stringify({
        type: "chat",
        payload: {
          userId: state.userId,
          message: state.input,
        },
      })
    );

    setState((draft) => {
      draft.input = "";
      return draft;
    });
  };

  return (
    <div className="flex h-screen w-full flex-col border border-gray-200 bg-white shadow-sm">
      <header className="flex items-center justify-between border-b px-4 py-3">
        <h1 className="text-lg font-semibold">WebSocket Chat</h1>
        <span
          className={`text-sm ${
            state.status === "Connected" ? "text-green-600" : "text-gray-500"
          }`}
        >
          {state.status}
        </span>
      </header>

      <ul className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {state.messages.map((msg) => (
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
          value={state.input}
          onChange={(e) =>
            setState((draft) => {
              draft.input = e.target.value;
              return draft;
            })
          }
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
