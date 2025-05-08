// app/(dashboard)/layout.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '../../styles/globals.css';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: '📊' },
  { name: 'My Tasks', path: '/tasks', icon: '✅' },
  { name: 'Team', path: '/teams', icon: '👥' },
];

export default function Layout({ children }) {
  const path = usePathname();

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <aside className="w-72 p-6 bg-white/5 border-r border-cyan-500/30 backdrop-blur-lg shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-cyan-300 mb-12">🧠 TaskBoard</h2>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block py-2 px-4 rounded-lg transition-all font-medium ${
                  path === item.path
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'hover:bg-cyan-400/10 hover:text-cyan-200'
                }`}
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </nav>
        </div>

      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
