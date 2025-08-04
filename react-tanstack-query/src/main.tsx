import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/17-query-cancellation.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
