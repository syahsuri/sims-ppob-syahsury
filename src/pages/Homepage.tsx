"use client";

import { useRef } from "react";
import Userbalance from "@/components/layouts/Users-balance";
import { features } from "@/data/FeaturesData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "@/data/SliderData";

export default function Homepage() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="px-8 py-6 space-y-8">
      {/* User Balance Section */}
      <Userbalance name="Kristanto Wibowo" />

      {/* Features Section */}
      <div className="flex overflow-x-auto gap-6 no-scrollbar justify-center">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="shrink-0 flex flex-col items-center justify-center text-center"
          >
            <img
              src={feature.icon}
              alt={feature.name}
              className="w-16 h-14 object-contain"
            />
            <p className="mt-2 text-sm font-medium text-gray-700">
              {feature.name.split(" ").map((word, i) => (
                <span key={i}>
                  {word}
                  {i !== feature.name.split(" ").length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      {/* Horizontal Banner Section */}
      <div className="relative mt-8">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 ml-9 mb-6">
          Temukan Promo Menarik Lainnya
        </h2>

        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Banner Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 no-scrollbar scroll-smooth px-8"
        >
          {banners.map((banner) => (
            <img
              key={banner.id}
              src={banner.image}
              alt={banner.alt}
              className="h-36 w-[320px] object-cover rounded-2xl shrink-0"
            />
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
