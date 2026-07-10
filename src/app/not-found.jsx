"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">

        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="h-28 w-28 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <AlertTriangle
              size={60}
              className="text-cyan-400"
            />
          </div>
        </motion.div>

        {/* 404 */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-8xl md:text-9xl font-black bg-linear-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 text-3xl md:text-4xl font-bold text-white"
        >
          Oops! Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 text-lg text-gray-300 leading-8"
        >
          The page you are looking for doesn't exist, has been moved,
          or you entered the wrong URL.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-5"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-xl border border-cyan-400 px-7 py-3 text-cyan-300 hover:bg-cyan-500 hover:text-white transition"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-7 py-3 text-white font-semibold hover:scale-105 transition"
          >
            <Home size={20} />
            Back Home
          </Link>
        </motion.div>

        {/* Decorative Glow */}
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>
    </div>
  );
}