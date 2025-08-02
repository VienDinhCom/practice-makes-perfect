import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/12-parallel-queries.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
