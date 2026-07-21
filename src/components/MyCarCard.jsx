"use client";

import { MapPin, Users, Car } from "lucide-react";
import Image from "next/image";
import EditeModal from "./EditeModal";
import DeleteAlert from "./DeleteAlert";

const MyCarCard = ({ car, onDelete }) => {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-slate-100">
      <div className="relative h-48">
        <Image
          src={car.imageUrl}
          alt={car.carName}
          fill
          className="object-cover"
        />

        <div className="absolute left-3 top-3 rounded-full bg-cyan-600 px-3 py-1 text-xs font-bold text-white">
          ${car.dailyRentPrice}/day
        </div>

        <div
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white ${
            car.availability === "Available" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {car.availability}
        </div>
      </div>

      <div className="space-y-3 p-5">
        <h3 className="text-xl font-bold text-slate-800">{car.carName}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Car size={16} className="text-cyan-600" />
          <span>{car.carType}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} className="text-red-500" />
          <span className="line-clamp-1">{car.pickupLocation}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3">
          <EditeModal car={car} />
          <DeleteAlert handleDelete={() => onDelete(car._id)} />
        </div>
      </div>
    </div>
  );
};

export default MyCarCard;