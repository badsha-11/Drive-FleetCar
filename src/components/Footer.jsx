"use client";

import Link from "next/link";
import { Car, Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative mb-0 pb-0  overflow-hidden bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              

              <h2 className="text-3xl font-extrabold bg-linear-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Drive Fleet Car
              </h2>
            </div>

            <p className="text-gray-400 leading-7">
              Discover, rent and drive premium cars with ease. Experience
              comfort, luxury and trusted car rentals anywhere.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-white">
              Useful Links
            </h3>

            <ul className="space-y-3">
              {[
                ["Home", "/"],
                ["Explore Cars", "/cars"],
                ["Add Car", "/add-car"],
                ["My Bookings", "/my-bookings"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([title, href]) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="inline-block text-gray-400 hover:text-cyan-400 hover:translate-x-2 transition-all duration-300"
                  >
                    ➜ {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-white">
              Contact Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-3 group">
                <MapPin className="text-cyan-400 group-hover:scale-125 transition" />
                <span className="text-gray-400">
                  Dhaka, Bangladesh
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <Phone className="text-cyan-400 group-hover:rotate-12 transition" />
                <span className="text-gray-400">
                  +880 19509-77611
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <Mail className="text-cyan-400 group-hover:scale-125 transition" />
                <span className="text-gray-400">
                  ishrankhan6111@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold mb-5 text-white">
              Follow Us
            </h3>

            <div className="flex gap-4">
              {[
                {
                  icon: FaFacebookF,
                  link: "https://www.facebook.com/isran611",
                },
                {
                  icon: FaInstagram,
                  link: "https://instagram.com",
                },
                {
                  icon: FaXTwitter,
                  link: "https://x.com",
                },
                {
                  icon: FaLinkedinIn,
                  link: "https://www.linkedin.com/in/isran-khan/",
                },
              ].map(({ icon: Icon, link }, index) => (
                <Link
                  key={index}
                  href={link}
                  target="_blank"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white transition-all duration-300 hover:-translate-y-2 hover:scale-110 hover:bg-cyan-500"
                >
                  <Icon size={20} />
                </Link>
              ))}
            </div>

            <p className="mt-6 text-gray-400 leading-7">
              Follow us on social media to get the latest offers,
              discounts and premium car updates.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Drive Fleet. All Rights Reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-gray-400 hover:text-cyan-400 transition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}