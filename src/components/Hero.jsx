"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import HeroCountUp from "./HeroCountUp";

const Hero = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch("http://localhost:8080/hero");

        if (!res.ok) {
          throw new Error("Failed to fetch hero data");
        }

        const data = await res.json();
        setSlides(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <div className="h-[92vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={slides.length > 1}
        pagination={{ clickable: true }}
        className="h-[92vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="relative h-[92vh]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-slate-950/90 via-slate-900/60 to-transparent" />

              {/* Glow */}
              <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
              <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />

              <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
                <div className="max-w-2xl">
                  <span className="inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-cyan-300">
                    Premium Car Rental
                  </span>

                  <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight text-white">
                    <span className="text-cyan-400">
                      {slide.title.split(" ").slice(0, 2).join(" ")}
                    </span>{" "}
                    <span>{slide.title.split(" ").slice(2).join(" ")}</span>
                  </h1>

                  <p className="mt-6 text-lg text-gray-300 leading-8">
                    {slide.description}
                  </p>

                  <div className="mt-10 flex flex-wrap gap-5">
                    <Link
                      href="/cars"
                      className="rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white hover:scale-105 transition"
                    >
                      Explore Cars
                    </Link>

                    <Link
                      href="/add-car"
                      className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur hover:bg-white/20 transition"
                    >
                      Add Your Car
                    </Link>
                  </div>

                  <HeroCountUp />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
