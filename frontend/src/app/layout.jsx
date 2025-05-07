import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import ClientLayout from "../components/ClientLayout";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Task Manager",
  description: "Modern task management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
