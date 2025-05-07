'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const hideLayoutRoutes = ['/', '/login', '/register'];
  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {!shouldHideLayout && <Sidebar />}
      <main className={`flex-1 w-screen h-screen ${!shouldHideLayout ? 'sm:ml-60 p-16' : ''}`}>
        {children}
      </main>
      {!shouldHideLayout && <Navbar />}
    </div>
  );
}
