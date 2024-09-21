import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AuthProvider from "@/components/auth-provider";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "@/context/global-context";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "PropertyPulse - Find the Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

export default function MainLayout({ children }) {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <div className="bp flex min-h-screen flex-col bg-blue-50">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <ToastContainer position="bottom-right" />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
}
