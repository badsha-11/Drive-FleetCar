"use client";

import { Button, Card } from "@heroui/react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Car,
  ArrowRight,
  
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AllCarsCard = ({ car }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="group h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(6,182,212,0.25)]">

        {/* Image */}
        <div className="relative h-40 overflow-hidden rounded-t-3xl">

          <Image
            src={car.imageUrl}
            alt={car.carName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>

          {/* Price */}
          <div className="absolute left-3 top-3 rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
            ${car.dailyRentPrice}/day
          </div>

          {/* Availability */}
          <div
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-md ${
              car.availability === "Available"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {car.availability}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 p-4">

          {/* Title */}
          <div>
            <h2 className="line-clamp-1 text-xl font-bold text-slate-800">
              {car.carName}
            </h2>

            <p className="text-sm font-medium text-cyan-600">
              {car.carType || "Premium Car"}
            </p>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-2 text-sm">

            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
              <Users size={16} className="text-cyan-600" />
              <span>{car.seatCapacity} Seats</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2">
              <Car size={16} className="text-cyan-600" />
              <span>{car.carType || "N/A"}</span>
            </div>

          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin size={16} className="text-red-500" />
            <span className="line-clamp-1">
              {car.pickupLocation}
            </span>
          </div>

          {/* Description */}
          <p className="line-clamp-1 text-sm text-gray-500">
            {car.description}
          </p>

          {/* Button */}
          <Link href={`/cars/${car._id}`}>
            <Button
            className="mt-2 h-10 w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 font-semibold text-white"
            endContent={<ArrowRight size={18} />}
          >
            View Details
          </Button>
          </Link>

        </div>
      </Card>
    </motion.div>
  );
};

export default AllCarsCard;