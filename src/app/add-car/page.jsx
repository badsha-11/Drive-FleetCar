"use client";

import {
  Button,
  Card,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  Switch,
  TextArea,
  TextField,
} from "@heroui/react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AddCarPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const car = Object.fromEntries(formData.entries());

    // IMPORTANT
    car.ownerEmail = user?.email;
    car.booking_count = 0;

    console.log(car);

    try {
      let token = null;

      await authClient.getSession({
        fetchOptions: {
          onSuccess: (ctx) => {
            token = ctx.response.headers.get("set-auth-jwt");
          },
        },
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(car),
      });

      const data = await res.json();

      if (data.acknowledged) {
        toast.success("Car added successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to add car!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-cyan-50 to-blue-100 py-14 px-4">
      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto"
      >
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Add New Car
          </h1>

          <p className="text-gray-600 mt-3">
            Fill in the details below to list your car for rent.
          </p>
        </div>

        {/* Form Card */}
        <Card className="p-8 rounded-3xl shadow-2xl border border-cyan-100">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              
              <TextField name="carName" isRequired>
                <Label>Car Name</Label>
                <Input placeholder="Tesla Model 3" />
                <FieldError />
              </TextField>

              
              <TextField name="dailyRentPrice" isRequired>
                <Label>Daily Rent Price ($)</Label>
                <Input type="number" placeholder="120" />
                <FieldError />
              </TextField>

              
              <div>
                <Label>Car Type</Label>

                <Select
                  name="carType"
                  placeholder="Select Car Type"
                  className="w-full"
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>

                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="SUV">SUV</ListBox.Item>
                      <ListBox.Item id="Classic">Classic</ListBox.Item>
                      <ListBox.Item id="Sedan">Sedan</ListBox.Item>
                      <ListBox.Item id="Hatchback">Hatchback</ListBox.Item>
                      <ListBox.Item id="Luxury">Luxury</ListBox.Item>
                      <ListBox.Item id="Convertible">Convertible</ListBox.Item>
                      <ListBox.Item id="Sports">Sports</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              
              <TextField name="seatCapacity" isRequired>
                <Label>Seat Capacity</Label>
                <Input type="number" placeholder="5" />
                <FieldError />
              </TextField>

              
              <TextField name="pickupLocation" isRequired>
                <Label>Pickup Location</Label>
                <Input placeholder="Dhaka" />
                <FieldError />
              </TextField>

              
              <TextField name="imageUrl" isRequired className="md:col-span-2">
                <Label>Image URL</Label>
                <Input type="url" placeholder="https://i.ibb.co/xxxx/car.jpg" />
                <FieldError />
              </TextField>

             
              <TextField
                name="description"
                isRequired
                className="md:col-span-2"
              >
                <Label>Description</Label>
                <TextArea
                  placeholder="Write a short description about your car..."
                  rows={5}
                />
                <FieldError />
              </TextField>
            </div>

           
            <div>
              <Label>Availability Status</Label>

              <Select
                name="availability"
                placeholder="Select Availability"
                className="w-full"
              >
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Available" textValue="Available">
                      Available
                    </ListBox.Item>
                    <ListBox.Item id="Unavailable" textValue="Unavailable">
                      Unavailable
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

           
            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:scale-[1.02] transition-all"
            >
              Add Car
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}