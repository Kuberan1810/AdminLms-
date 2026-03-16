
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 🔹 React Query client
const queryClient = new QueryClient();

// Initialize dark mode from localStorage
if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
  localStorage.theme = "dark"; // ensure it's saved if it was system preference
} else {
  document.documentElement.classList.remove("dark");
  localStorage.theme = "light";
}

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);

