import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/15-multipart-query-keys.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
