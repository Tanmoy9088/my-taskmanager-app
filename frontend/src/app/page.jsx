// app/page.jsx
'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-cyan-300 text-center drop-shadow-lg">
        🚀 Welcome to TaskBoard
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => router.push('/register')}
          className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
        >
          Register
        </button>

        <button
          onClick={() => router.push('/login')}
          className="px-8 py-3 bg-white text-cyan-600 hover:text-cyan-700 font-semibold rounded-xl shadow-md transition-all duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}