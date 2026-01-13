import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/global.css";
import { Chat } from "./components/chat.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Chat />
  </StrictMode>
);
