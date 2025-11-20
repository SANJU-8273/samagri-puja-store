import "../app/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "./context/CartContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";   // ⭐ ADD THIS

export const metadata = {
  title: "Samagri Store",
  description: "Premium Puja Samagri Store built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className="-mt-8 bg-[#ff5e19e0] ">

          {/* ⭐ GLOBAL TOASTER (Works Everywhere) */}
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 2500,
              style: {
                fontSize: "14px",
                borderRadius: "10px",
                padding: "10px 15px",
              },
            }}
          />

          <CartProvider>

            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="pt-20 min-h-screen">
              {children}
            </main>

            {/* Cart Drawer */}
            <CartDrawer />

            {/* Footer */}
            <Footer />

          </CartProvider>

        </body>
      </html>
    </ClerkProvider>
  );
}
