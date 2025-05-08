'use client';
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://my-taskmanager-app.onrender.com/api/auth/register",
        { username, email, password, role },
        { withCredentials: true }
      );

      setUsername("");
      setEmail("");
      setPassword("");
      setRole("user");

      window.location.href = "/login";
    } catch (error) {
      console.error(error.response?.data || "Registration error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl flex flex-col md:flex-row gap-8 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl"
      >
        {/* Left Section */}
        <div className="flex-1 text-white flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-4">Join Us</h1>
          <p className="text-lg text-center">
            Create your account and start managing your tasks like a pro.
          </p>
        </div>

        {/* Right Section: Form */}
        <div className="flex-1 bg-white/5 rounded-lg p-6 shadow-md">
          <form onSubmit={handleRegister} className="flex flex-col gap-5 text-white">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="mt-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold rounded-lg shadow-lg"
            >
              Register
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
