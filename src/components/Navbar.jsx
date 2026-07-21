"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const isLoggedIn = !!user;

  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/cars" },
    { name: "Add Car", href: "/add-car" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: 'My Added Cars', href: '/my-added-cars' },
  ];

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Logout successfully!");
    } catch (error) {
      toast.error("Logout failed!");
      console.error(error);
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="sticky top-0 z-50 bg-linear-to-r from-slate-950/95 via-blue-950/95 to-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-xl"
    >
      <nav className="max-w-7xl mx-auto h-20 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-3xl font-black bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Drive Fleet Car
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative font-semibold transition ${
                pathname === item.href
                  ? "text-cyan-400"
                  : "text-white hover:text-cyan-400"
              }`}
            >
              {item.name}

              {pathname === item.href && (
                <motion.span
                  layoutId="active"
                  className="absolute -bottom-2 left-0 h-0.5 w-full bg-cyan-400"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-300 hover:bg-cyan-500 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-5 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Profile Link */}
              <Link
                href="/profile"
                className="flex items-center gap-3 hover:opacity-80 transition"
              >
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-lg border-2 border-cyan-400">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <h3 className="text-white font-semibold">Profile</h3>
              </Link>

              <button
                onClick={handleSignOut}
                className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white">
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
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-slate-950 border-t border-cyan-500/20"
          >
            <div className="flex flex-col gap-5 p-6">
              {/* Nav Links */}
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`${
                    pathname === item.href ? "text-cyan-400" : "text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <hr className="border-cyan-500/20" />

              {/* Auth Section */}
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="text-center py-3 rounded-xl border border-cyan-400 text-cyan-300"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="text-center py-3 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  {/* Mobile Profile Link */}
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 hover:opacity-80 transition"
                  >
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-lg border-2 border-cyan-400">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <h3 className="text-white font-semibold">Profile</h3>
                  </Link>

                  <button
                    onClick={() => {
                      setOpen(false);
                      handleSignOut();
                    }}
                    className="py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition"
                  >
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