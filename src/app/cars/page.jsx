import AllCars from "@/components/AllCars";

const AllCarsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
    cache: "no-store",
  });

  const cars = await res.json();
  

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-cyan-50 to-blue-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-8">
        <div className="text-center">
          <h1 className="text-5xl font-black bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Explore Our Cars
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Find your perfect ride from our premium collection.
          </p>
        </div>

        {/* Cars Component */}
        <div className="mt-10">
          <AllCars cars={cars} />
        </div>
      </div>
    </div>
  );
};

export default AllCarsPage;