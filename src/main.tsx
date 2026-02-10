import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AddressProvider } from "./context/AddressContext.tsx";
import { CartProvider } from "./context/CartContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AddressProvider>
          <CartProvider>
            <App />
            <Toaster
              richColors
              toastOptions={{
                classNames: {
                  toast:
                    "bg-background text-foreground border border-border shadow-lg",
                  success: "bg-primary text-primary-foreground",
                  error: "bg-destructive text-destructive-foreground",
                  warning: "bg-yellow-500 text-white",
                  info: "bg-blue-500 text-white",
                },
              }}
            />
          </CartProvider>
        </AddressProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
