// app/layout.js or layout.tsx
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import ClientLayout from "../components/ClientLayout";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

export const metadata = {
  title: "Task Manager",
  description: "Modern task management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Suspense fallback={null}>
            <ClientLayout>{children}</ClientLayout>
          </Suspense>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
