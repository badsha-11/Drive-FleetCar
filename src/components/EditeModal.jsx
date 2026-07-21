"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Modal } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const EditeModal = ({ car }) => {
  const router = useRouter();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    console.log(car._id);
    const updatedCar = {
      carName: form.carName.value,
      dailyRentPrice: form.dailyRentPrice.value,
      carType: form.carType.value,
      seatCapacity: form.seatCapacity.value,
      pickupLocation: form.pickupLocation.value,
      imageUrl: form.imageUrl.value,
      description: form.description.value,
      availability: form.availability.value,
    };

    try {
      let token = null;

      await authClient.getSession({
        fetchOptions: {
          onSuccess: (ctx) => {
            token = ctx.response.headers.get("set-auth-jwt");
          },
        },
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${car._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCar),
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Car updated successfully");
        router.refresh();
      } else {
        toast.error("No changes made or update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  return (
    <Modal>
      <Button className="w-full h-12 rounded-xl bg-amber-500 text-white">
        Edit Car
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-cyan-100 text-cyan-600">
                <Envelope className="size-5" />
              </Modal.Icon>

              <Modal.Heading>Update Car</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <form onSubmit={handleUpdate} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    label="Car Name"
                    name="carName"
                    defaultValue={car.carName}
                    placeholder="Tesla Model 3"
                  />

                  <Input
                    label="Daily Rent Price ($)"
                    name="dailyRentPrice"
                    type="number"
                    defaultValue={car.dailyRentPrice}
                    placeholder="120"
                  />

                  <Input
                    label="Car Type"
                    name="carType"
                    defaultValue={car.carType}
                    placeholder="SUV / Sedan / Luxury"
                  />

                  <Input
                    label="Seat Capacity"
                    name="seatCapacity"
                    type="number"
                    defaultValue={car.seatCapacity}
                    placeholder="5"
                  />

                  <Input
                    label="Pickup Location"
                    name="pickupLocation"
                    defaultValue={car.pickupLocation}
                    placeholder="Dhaka"
                  />

                  <Input
                    label="Image URL"
                    name="imageUrl"
                    defaultValue={car.imageUrl}
                    placeholder="https://i.ibb.co/xxxx/car.jpg"
                    className="md:col-span-2"
                  />

                  <textarea
                    name="description"
                    defaultValue={car.description}
                    rows={5}
                    placeholder="Write a short description..."
                    className="md:col-span-2 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-cyan-500"
                  />
                </div>

                <select
                  name="availability"
                  defaultValue={car.availability}
                  className="w-full rounded-xl border border-gray-300 p-3"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>

                <Button
                  type="submit"
                  className="h-14 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-lg font-bold text-white"
                >
                  Update Car
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

export default EditeModal;