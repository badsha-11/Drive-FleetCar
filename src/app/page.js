
import AllCars from "@/components/AllCars";
import Hero from "@/components/Hero";
import AllCarsPage from "./cars/page";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import Features from "@/components/Features";

 

export default function Home() {
  return (
    <>
      <Hero/>
      {/* <AllCarsPage/> */}
      <Features/>
      <AboutPage/>
      <ContactPage/>
    </>
  );
}
