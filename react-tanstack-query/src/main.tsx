import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/10-keys-and-caching.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
