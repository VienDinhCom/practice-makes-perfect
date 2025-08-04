import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/14-disabling-queries.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
