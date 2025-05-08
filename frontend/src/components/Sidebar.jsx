"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaTachometerAlt, FaPlusCircle, FaUsers, FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const links = [
    { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { label: "Create Task", path: "/assignTask", icon: <FaPlusCircle /> },
    { label: "Team", path: "/Team", icon: <FaUsers /> },
  ];

// Safe on client only
useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // run once after mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const SidebarLinks = ({ onClick }) => (
    <ul className="space-y-4 mt-6">
      {links.map((link) => (
        <li key={link.path}>
          <Link href={link.path} onClick={onClick} className="flex items-center gap-3 hover:text-cyan-300 transition">
            <span className="text-lg">{link.icon}</span>
            {open && <span className="text-sm font-medium">{link.label}</span>}
          </Link>
        </li>
      ))}
    </ul>
  );

  // Mobile
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setShowMobileMenu(true)}
          className="fixed top-4 left-4 z-50 text-white bg-black/50 px-3 py-2 rounded-md"
        >
          <FaBars />
        </button>

        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
            showMobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setShowMobileMenu(false)}
        />

        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-[#1e1e2f] text-white p-6 z-50 transform transition-transform duration-300 ease-in-out ${
            showMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">MyApp</h2>
            <button onClick={() => setShowMobileMenu(false)} className="text-xl">
              <FaTimes />
            </button>
          </div>
          <SidebarLinks onClick={() => setShowMobileMenu(false)} />
        </aside>
      </>
    );
  }

  // Desktop
  return (
    <aside
      className={`h-screen fixed top-16 left-0 bg-[#1e1e2f] text-white border-r border-white/20 p-4 transition-all duration-300 z-30 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {open && <h2 className="text-xl font-bold">TaskManager</h2>}
        <button onClick={() => setOpen(!open)} className="text-xl">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <SidebarLinks />
    </aside>
  );
}
