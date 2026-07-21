"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import AllCarsCard from "./AllCarsCard";

const carTypes = [
  "All",
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Sports",
  "Classic",
  "Convertible",
];

const AllCars = ({ cars: initialCars }) => {
  const [cars, setCars] = useState(initialCars || []);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(false);

  // 🔍 Backend search + filter
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (type !== "All") params.append("type", type);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/cars?${params.toString()}`
        );

        const data = await res.json();

        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchCars, 400); // debounce

    return () => clearTimeout(timer);
  }, [search, type]);

  return (
    <div className="w-full">
      {/* Search + Filter */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <h2 className="text-3xl font-bold text-slate-800">
          Browse All Cars
        </h2>

        <p className="text-gray-500">
          Search by car name and filter by car type.
        </p>

        <div className="w-full max-w-5xl grid md:grid-cols-3 gap-4 mt-4">
          {/* Search */}
          <div className="relative md:col-span-2">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by car name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-cyan-200 bg-white py-4 pl-12 pr-5 shadow-lg outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200"
            />
          </div>

          {/* Filter */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-48 rounded-2xl border border-cyan-200 bg-white px-4 py-4 shadow-lg outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-200"
          >
            {carTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Count */}
      <p className="mb-8 text-center text-gray-600 font-semibold">
        {cars.length} Car{cars.length !== 1 ? "s" : ""} Found
      </p>

      {/* Loading */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          <p className="mt-4 text-gray-500">Searching cars...</p>
        </div>
      ) : cars.length > 0 ? (
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {cars.map((car, index) => (
            <motion.div
              key={car._id}
              layout
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
            >
              <AllCarsCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            alt="No Cars"
            className="mx-auto mb-6 w-40 opacity-80"
          />

          <h2 className="text-3xl font-bold text-gray-700">
            No Cars Found
          </h2>

          <p className="mt-2 text-gray-500">
            Try another keyword or car type.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default AllCars;