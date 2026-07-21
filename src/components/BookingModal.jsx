"use client";

import {
  Button,
  Input,
  Modal,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";


const BookingModal = ({ car }) => {
  
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBooking = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const booking = Object.fromEntries(formData.entries());

    // car id add
    booking.carId = car._id;

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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(booking),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking successful!");
        e.target.reset();
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Modal>
      <Button className="h-14 w-full rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-lg font-semibold text-white">
        Book This Car For Rent
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Book {car.carName}</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <form onSubmit={handleBooking} className="space-y-5">
                <Input
                  label="Car Name"
                  defaultValue={car.carName}
                  disabled
                  className="w-full"
                />

                <Input
                  label="Daily Rent Price"
                  defaultValue={`$${car.dailyRentPrice} / Day`}
                  disabled
                  className="w-full"
                />

                <Input
                  label="Your Name"
                  name="customerName"
                  defaultValue={user?.name}
                  placeholder="Enter your full name"
                  className="w-full"
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="customerEmail"
                  defaultValue={user?.email}
                  placeholder="example@gmail.com"
                  className="w-full"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  className="w-full"
                   required
                />

                <Input
                  label="Booking Date"
                  type="date"
                  name="bookingDate"
                  className="w-full"
                   required
                />

                <Input
                  label="Pickup Location"
                  defaultValue={car.pickupLocation}
                  disabled
                  className="w-full"
                />

                <Input
                  label="Address"
                  name="address"
                  placeholder="Enter your full address"
                  className="w-full"
                   required
                />
                <select
                  name="driverNeeded"
                  required
                  className="w-full h-12 rounded-xl border border-default-300 px-3 outline-none"
                >
                  <option value="">Driver Needed?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Special Note
                  </label>

                  <textarea
                    name="specialNote"
                    rows={4}
                    placeholder="Write any special request (optional)"
                    className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold"
                >
                  Confirm Booking
                </Button>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default BookingModal;
