import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/08-stale-time.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
