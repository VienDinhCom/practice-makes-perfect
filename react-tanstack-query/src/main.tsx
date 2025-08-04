import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/18-dependent-queries.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
