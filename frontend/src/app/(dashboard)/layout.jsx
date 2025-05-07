"use client";
import { useState, useEffect } from "react";
import { AuthProvider } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen min-w-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
        <Sidebar />
        <main className="flex-1 sm:ml-60 pt-20 p-6">{children}</main>
        <Navbar />
      </div>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-full z-50"
      >
        {theme === "light" ? "🌙" : "🌞"}
      </button>
    </AuthProvider>
  );
}
