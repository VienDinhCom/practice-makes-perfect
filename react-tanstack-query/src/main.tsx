import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/11-reuse-queries.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
