"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error state
  const [loading, setLoading] = useState(false); // Loading state for form submission

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous error
  
    try {
      // Add withCredentials in the axios config, not inside the body
      const response = await axios.post(
        "http://localhost:5000/api/auth/login", 
        { email, password },
        { withCredentials: true } // Add this in the config
      );
      console.log("Login response:", response.data);
      
      // Redirect to dashboard or home page upon successful login
      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed! Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };
  

  // This function will be called when the Google login is successful
  const handleLoginSuccess = async (response) => {
    const token = response.credential; // The Google token

    try {
      // Send the Google token to your backend for verification and user creation
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        { token}
      );

      // Handle the response from the backend (e.g., save user info or token)
      setUser(res.data);
      console.log("User logged in successfully:", res.data);
      // Redirect to the dashboard or other page
      router.push("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // This function will be called when the Google login fails
  const handleLoginFailure = (error) => {
    console.error("Google Login Failed:", error);
  };

  const handleFacebookLogin = () => {
    // Placeholder for Facebook login integration
    console.log("Facebook login initiated");
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
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-center">
            Log in to access your tasks and manage your workflow.
          </p>
        </div>

        {/* Right Section: Form */}
        <div className="flex-1 bg-white/5 rounded-lg p-6 shadow-md">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5 text-white"
          >
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
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="mt-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold rounded-lg shadow-lg disabled:bg-purple-400"
            >
              {loading ? "Logging in..." : "Log In"}
            </motion.button>
          </form>
          {/* Social Login Section */}
          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLoginSuccess}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 transition text-white font-semibold rounded-lg shadow-lg"
            >
              Google
            </motion.button>
           
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFacebookLogin}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg shadow-lg"
            >
              Facebook
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
