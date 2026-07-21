"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button, Card, Input } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
         name: user.name,
        email: user.email,
        password: user.password,
        photo: user.photo,
    });
    if(data){
        toast.success("Account created successfully!");
        redirect('/')
    }if(error){
        toast.error("Something went wrong! Please try again.");
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
                Create Account
              </h1>
            </motion.div>

            <p className="text-gray-500 mt-2">
              Register to start renting your favorite car.
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            {/* Name */}
            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              className="w-full"
            />

            {/* Email */}
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full"
            />

            {/* Photo URL */}
            <Input
              label="Photo URL"
              type="url"
              name="photo"
              placeholder="https://example.com/photo.jpg"
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

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl"
            >
              Register
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-300"></div>
              <span className="text-sm text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-300"></div>
            </div>

            {/* Google Register */}
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-cyan-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
