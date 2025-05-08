"use client";
const axios = require("axios");
async function getUsers() {
  const res = await axios.get("http://localhost:5000/api/auth/users", {
    withCredentials: true,
  });

  return res.json();
}

export default async function TeamPage() {
  const users = await getUsers();

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
              src={`https://i.pravatar.cc/150?u=${user.id}`}
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
