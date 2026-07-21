"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import CountUp from "react-countup";
import { Car, ShieldCheck, Clock, Users, MapPin, Award } from "lucide-react";

const features = [
  {
    icon: Car,
    title: "Premium Fleet",
    desc: "A wide range of well-maintained cars, from economy to luxury.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Insured",
    desc: "Every ride is backed by full insurance and safety checks.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    desc: "Our support team is available round the clock for any help.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    desc: "Thousands of happy customers trust us for their travel needs.",
  },
  {
    icon: MapPin,
    title: "Multiple Locations",
    desc: "Pick up and drop off your car at convenient locations.",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    desc: "Competitive daily rates with no hidden charges.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-cyan-50 to-blue-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero / Intro */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={container}
          className="grid lg:grid-cols-2 gap-10 items-center mb-20"
        >
          <motion.div variants={slideLeft}>
            <span className="inline-block rounded-full bg-cyan-100 px-5 py-2 text-cyan-700 font-semibold">
              About Drive Fleet
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight">
              Driving You Towards{" "}
              <span className="bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Comfort & Freedom
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Drive Fleet is a premium car rental platform built to make
              renting a car simple, fast and reliable. Whether you need a car
              for a weekend trip or a long business journey, we connect you
              with the perfect ride at the best price.
            </p>
          </motion.div>

          <motion.div variants={slideRight}>
            <Card className="p-10 rounded-3xl shadow-2xl border border-cyan-100 bg-white">
  <div className="grid grid-cols-2 gap-8 text-center">
    <div>
      <h3 className="text-4xl font-black text-cyan-600">
        <CountUp
          end={500}
          duration={3}
          suffix="+"
          enableScrollSpy
          scrollSpyOnce
        />
      </h3>
      <p className="mt-2 text-gray-500">Cars Available</p>
    </div>

    <div>
      <h3 className="text-4xl font-black text-cyan-600">
        <CountUp
          end={10000}
          duration={3}
          separator=","
          suffix="+"
          enableScrollSpy
          scrollSpyOnce
        />
      </h3>
      <p className="mt-2 text-gray-500">Happy Customers</p>
    </div>

    <div>
      <h3 className="text-4xl font-black text-cyan-600">
        <CountUp
          end={25}
          duration={3}
          suffix="+"
          enableScrollSpy
          scrollSpyOnce
        />
      </h3>
      <p className="mt-2 text-gray-500">Cities Covered</p>
    </div>

    <div>
      <h3 className="text-4xl font-black text-cyan-600">24/7</h3>
      <p className="mt-2 text-gray-500">Customer Support</p>
    </div>
  </div>
</Card>
          </motion.div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-white p-10 shadow-xl mb-20 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-8">
            We believe renting a car should be as easy as booking a ride. Our
            mission is to remove the hassle from car rentals — transparent
            pricing, verified vehicles and a seamless booking experience, all
            in one platform.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map(({ icon: Icon, title, desc }, index) => (
            <motion.div
              key={title}
              variants={index % 2 === 0 ? slideLeft : slideRight}
            >
              <Card className="p-8 rounded-3xl shadow-lg border border-cyan-50 h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600">
                  <Icon className="text-white" size={26} />
                </div>

                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-gray-600 leading-7">{desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-20 rounded-3xl bg-linear-to-r from-cyan-500 to-blue-600 p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-3">Ready to hit the road?</h2>
          <p className="text-cyan-50 mb-6">
            Explore our fleet and book your perfect ride today.
          </p>

          <Link
            href="/cars"
            className="inline-block rounded-xl bg-white px-8 py-4 font-bold text-cyan-600 hover:scale-105 transition"
          >
            Explore Cars
          </Link>
        </motion.div>
      </div>
    </div>
  );
}