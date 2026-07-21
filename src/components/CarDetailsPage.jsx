"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

import {
  MapPin,
  Users,
  Car,
  CircleDollarSign,
  CheckCircle2,
} from "lucide-react";

import Loader from "./Loader";
import DeleteAlert from "./DeleteAlert";
import EditeModal from "./EditeModal";
import BookingModal from "./BookingModal";

const CarDetailsPage = ({ car }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      let token = null;

      await authClient.getSession({
        fetchOptions: {
          onSuccess: (ctx) => {
            token = ctx.response.headers.get("set-auth-jwt");
          },
        },
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Car deleted successfully ");

        setTimeout(() => {
          router.replace("/cars");
        }, 1000);
      } else {
        toast.error("Failed to delete car!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  if (!car) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-cyan-50 to-blue-100 py-14 px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-10 items-center"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={car.imageUrl}
              alt={car.carName}
              width={700}
              height={500}
              className="h-105 w-full object-cover"
            />

            <div className="absolute top-5 left-5 rounded-full bg-cyan-600 px-5 py-2 text-white font-semibold">
              ${car.dailyRentPrice}/Day
            </div>

            <div
              className={`absolute top-5 right-5 rounded-full px-5 py-2 text-white ${
                car.availability === "Available" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {car.availability}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-white p-8 shadow-xl"
          >
            <h1 className="text-5xl font-black">{car.carName}</h1>

            <p className="mt-2 text-cyan-600">{car.carType || "Premium Car"}</p>

            <div className='mt-8 space-y-4'>
  <div className='flex items-center gap-3 rounded-xl bg-slate-100 p-4'>
    <CircleDollarSign className='text-cyan-600' />
    <div>
      <p className='text-sm text-gray-500'>Daily Rent</p>
      <h3 className='font-bold'>${car.dailyRentPrice}</h3>
    </div>
  </div>

  <div className='flex items-center gap-3 rounded-xl bg-slate-100 p-4'>
    <Users className='text-cyan-600' />
    <div>
      <p className='text-sm text-gray-500'>Seat Capacity</p>
      <h3>{car.seatCapacity} Seats</h3>
    </div>
  </div>

  <div className='flex items-center gap-3 rounded-xl bg-slate-100 p-4'>
    <Car className='text-cyan-600' />
    <div>
      <p className='text-sm text-gray-500'>Car Type</p>
      <h3>{car.carType || 'Not Specified'}</h3>
    </div>
  </div>

  <div className='flex items-center gap-3 rounded-xl bg-slate-100 p-4'>
    <MapPin className='text-red-500' />
    <div>
      <p className='text-sm text-gray-500'>Pickup Location</p>
      <h3>{car.pickupLocation}</h3>
    </div>
  </div>

  
  <div className='flex items-center gap-3 rounded-xl bg-slate-100 p-4'>
    <CheckCircle2 className='text-cyan-600' />
    <div>
      <p className='text-sm text-gray-500'>Total Bookings</p>
      <h3 className='font-bold'>{car.booking_count || 0}</h3>
    </div>
  </div>
</div>

            <div className="mt-8 space-y-3">
              <BookingModal car={car} />

              <div className="grid grid-cols-2 gap-3">
                <EditeModal car={car} />
                <DeleteAlert handleDelete={() => handleDelete(car._id)} />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 rounded-3xl bg-white p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold mb-5">Description</h2>

          <p>{car.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {[
            "Instant Booking",
            "24/7 Customer Support",
            "Free Cancellation",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white p-6 shadow-lg flex items-center gap-3"
            >
              <CheckCircle2 className="text-green-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;