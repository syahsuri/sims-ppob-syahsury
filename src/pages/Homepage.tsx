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
    <div className="px-4 md:px-8 py-6 space-y-8">
      <Userbalance name="Kristanto Wibowo" />

      {/* Content */}
      <div className="flex justify-center">
        <div className="flex overflow-x-auto gap-2 md:gap-0 no-scrollbar px-2">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="shrink-0 flex flex-col items-center justify-center text-center w-20 md:w-24"
            >
              <img
                src={feature.icon}
                alt={feature.name}
                className="w-14 h-12 object-contain"
              />
              <p className="mt-1 text-sm font-medium text-gray-700">
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
      </div>

      <div className="relative mt-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 ml-2 md:ml-9 mb-4 md:mb-6">
          Temukan Promo Menarik Lainnya
        </h2>

        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scroll-smooth px-2 md:px-8 no-scrollbar"
        >
          {banners.map((banner) => (
            <img
              key={banner.id}
              src={banner.image}
              alt={banner.alt}
              className="h-36 md:h-40 w-72 md:w-80 lg:w-80 object-cover rounded-2xl shrink-0 flex-none"
            />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      {/* End Of Content */}
    </div>
  );
}
