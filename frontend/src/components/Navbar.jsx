"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [user, setUser] = useState(null);
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    // Update the route without page reload
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-md px-8 py-4 flex justify-between items-center text-white">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <div className="flex items-center gap-6">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
          className="bg-gray-800 text-white px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        {user && (
          <p className="text-sm text-gray-300">
            Logged in as: <span className="font-medium">{user.username}</span>
          </p>
        )}
        <button
          onClick={handleLogout}
          className="px-4 py-1 rounded-md bg-red-500 hover:bg-red-600 transition text-white font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
