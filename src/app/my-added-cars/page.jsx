"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MyCarCard from "@/components/MyCarCard";
import Loader from "@/components/Loader";



const MyAddedCarsPage = () => {
     const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [cars, setCars] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Private route — লগইন না থাকলে login page-এ পাঠান
  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/login");
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyCars = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/cars?email=${user.email}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setCars(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setCars([]);
      } finally {
        setFetching(false);
      }
    };

    fetchMyCars();
  }, [user]);

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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Car deleted successfully!");
        setCars((prev) => prev.filter((car) => car._id !== id));
      } else {
        toast.error("Failed to delete car!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const loading = isPending || fetching;

  if (loading) return <Loader />;
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 via-cyan-50 to-blue-100 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            My Added Cars
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Manage the cars you've listed for rent.
          </p>
        </div>

        {cars.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow">
            <h2 className="text-2xl font-bold">No Cars Added Yet</h2>
            <p className="text-gray-500 mt-2">
              You haven't listed any cars for rent.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map((car) => (
              <MyCarCard key={car._id} car={car} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
    );
};

export default MyAddedCarsPage;