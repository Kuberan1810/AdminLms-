
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 🔹 React Query client
const queryClient = new QueryClient();

// Initialize theme (Defaults to Light Mode)
if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
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

