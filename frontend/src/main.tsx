import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CalendarProvider } from "./context/CalendarContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
   <CalendarProvider>
  <App />

  <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 2500,
      style: {
        borderRadius: "12px",
      },
    }}
  />
</CalendarProvider>
  </React.StrictMode>
);