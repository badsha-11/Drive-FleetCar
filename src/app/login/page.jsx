"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, Card, Input } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage = () => {
  

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Login successful!");
      redirect('/')
    }

    if (error) {
      toast.error("Invalid email or password!");
    }
  };

   const handleGoogleSignin = async()=>{
      const data = await authClient.signIn.social({
      provider: "google",
    });
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 via-cyan-50 to-blue-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      >
        <Card className="w-full max-w-md rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-black bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Welcome Back
              </h1>
            </motion.div>

            <p className="text-gray-500 mt-2">
              Login to continue your Drive Fleet journey.
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            {/* Email */}
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full"
            />

            {/* Password */}
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full"
            />

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl"
            >
              Login
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <Button
              type="button"
              variant="bordered"
              onClick={handleGoogleSignin}
              className="w-full h-12 rounded-xl border border-gray-300 flex items-center justify-center gap-3"
            >
              <FcGoogle size={22} />
              Continue with Google
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-cyan-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;