"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Message sent successfully!");
      e.target.reset();
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-cyan-50 to-blue-100 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Have questions about renting a car? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          
          variants={container}
          className="grid lg:grid-cols-2 gap-10"

          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          
        >
          {/* Contact Info */}
          <motion.div variants={slideLeft} className="space-y-6">
            <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-lg">
              <div className="rounded-full bg-cyan-100 p-4">
                <Mail className="text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <h3 className="font-bold text-lg">support@drivefleet.com</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-lg">
              <div className="rounded-full bg-cyan-100 p-4">
                <Phone className="text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <h3 className="font-bold text-lg">+880 1XXX-XXXXXX</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-lg">
              <div className="rounded-full bg-cyan-100 p-4">
                <MapPin className="text-cyan-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <h3 className="font-bold text-lg">Dhaka, Bangladesh</h3>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={slideRight}
            className="rounded-3xl bg-white p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Write your message here..."
                  className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-lg font-bold text-white flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-60"
              >
                <Send size={20} />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
