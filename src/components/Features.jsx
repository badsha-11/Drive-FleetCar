import FeaturesClient from "./FeaturesClient";

const Features = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/features`,
    {
      cache: "no-store",
    }
  );

  const features = await res.json();

  return <FeaturesClient features={features} />;
};

export default Features;