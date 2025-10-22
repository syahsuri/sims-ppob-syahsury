import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: number;
  image: string;
  alt: string;
}

interface BannerScrollProps {
  banners: Banner[];
}

export default function BannerScroll({ banners }: BannerScrollProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mt-8">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 ml-2 md:ml-9 mb-4 md:mb-6">
        Temukan Promo Menarik Lainnya
      </h2>

      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-100"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Banner List */}
      <div ref={scrollRef} className="flex overflow-x-auto gap-4 scroll-smooth px-2 md:px-8 no-scrollbar">
        {banners.map((banner) => (
          <img
            key={banner.id}
            src={banner.image}
            alt={banner.alt}
            className="h-36 md:h-40 w-72 md:w-80 lg:w-80 object-cover rounded-2xl shrink-0 flex-none"
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
  );
}
