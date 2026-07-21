import CarDetailsPage from "@/components/CarDetailsPage";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;

  let token = null;

  await auth.api.getSession({
    headers: await headers(),
    asResponse: true,
  }).then((res) => {
    token = res.headers.get("set-auth-jwt");
  });

  let car = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Backend responded with:", res.status);
      notFound();
    }

    car = await res.json();
  } catch (error) {
    console.error(error);
    notFound();
  }

  if (!car) {
    notFound();
  }

  return <CarDetailsPage car={car} />;
}