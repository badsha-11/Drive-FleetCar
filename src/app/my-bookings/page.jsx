"use client";

import DeleteBookingModal from "@/components/DeleteBookingModal";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, MapPin, CircleDollarSign } from "lucide-react";
import { Button } from "@heroui/react";
import Loader from "@/components/Loader";

const MyBookingPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!user?.email) return; 

    const fetchBookings = async () => {
      setFetching(true);
      try {
        let token = null;

        await authClient.getSession({
          fetchOptions: {
            onSuccess: (ctx) => {
              token = ctx.response.headers.get("set-auth-jwt");
            },
          },
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings?email=${user.email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setBookings([]);
      } finally {
        setFetching(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleDeleteBooking = (id) => {
    setBookings(bookings.filter((item) => item._id !== id));
  };

  
  const loading = isPending || fetching;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-cyan-50 to-blue-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-black text-center mb-10 bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
          My Bookings
        </h1>

        {loading ? (
          <Loader/>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow">
            <h2 className="text-2xl font-bold">No Booking Found</h2>
            <p className="text-gray-500 mt-2">
              You haven't booked any cars yet.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <Image
                  src={booking.imageUrl}
                  alt={booking.carName}
                  width={700}
                  height={400}
                  className="w-full h-60 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-3xl font-bold">{booking.carName}</h2>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <CircleDollarSign className="text-cyan-600" />
                      <span>${booking.dailyRentPrice}/Day</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="text-red-500" />
                      <span>{booking.pickupLocation}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <CalendarDays className="text-green-500" />
                      <span>Booking Date: {booking.bookingDate}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <Link href={`/cars/${booking.carId}`}>
                      <Button className="w-full bg-cyan-600 text-white">
                        View Details
                      </Button>
                    </Link>

                    <DeleteBookingModal
                      id={booking._id}
                      onDelete={handleDeleteBooking}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingPage;