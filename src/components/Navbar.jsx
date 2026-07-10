"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Change this with your auth state
  const isLoggedIn = false;

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Explore Cars",
      href: "/cars",
    },
    {
      name: "Add Car",
      href: "/add-car",
    },
    {
      name: "My Bookings",
      href: "/my-bookings",
    },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-linear-to-r from-slate-950/95 via-blue-950/95 to-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl"
    >
      <nav className="max-w-7xl mx-auto px-3 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-extrabold bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Drive Fleet Car
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-semibold transition-all duration-300 ${
                pathname === item.href
                  ? "text-cyan-400"
                  : "text-gray-200 hover:text-cyan-400"
              }`}
            >
              {item.name}

              {pathname === item.href && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute left-0 -bottom-2 h-0.75 w-full rounded-full bg-cyan-400"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden lg:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition-all duration-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-xl text-white bg-linear-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 shadow-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-cyan-300 font-semibold hover:text-white transition"
              >
                My Profile
              </Link>

              <button className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition text-white">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:hidden overflow-hidden bg-slate-950/95 backdrop-blur-xl border-t border-cyan-500/20"
          >
            <div className="flex flex-col p-6 gap-5">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`font-medium transition ${
                    pathname === item.href
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <hr className="border-cyan-500/20" />

              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="text-center py-3 rounded-xl border border-cyan-400 text-cyan-300"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="text-center py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="text-cyan-300"
                  >
                    My Profile
                  </Link>

                  <button className="py-3 rounded-xl bg-red-500 text-white">
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}