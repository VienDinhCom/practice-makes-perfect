import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/07-refetching-indicators.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
