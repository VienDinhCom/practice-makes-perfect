import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/09-cache-time.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
