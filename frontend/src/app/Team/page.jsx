"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TeamPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios.get("https://my-taskmanager-app.onrender.com/api/auth/users", {
          withCredentials: true,
        });
        setUsers(res.data); // Axios response is already parsed
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    }

    getUsers();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading users...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md p-4 rounded text-center"
          >
            <img
              src={`${user.id}`}
              alt={user.name}
              className="rounded-full w-24 h-24 mx-auto"
            />
            <h2 className="text-lg font-semibold mt-2">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
