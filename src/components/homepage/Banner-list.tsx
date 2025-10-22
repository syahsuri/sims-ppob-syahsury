import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBanners } from "@/redux/slices/BannerSlice";

export default function BannerScroll() {
  const dispatch = useAppDispatch();
  const { data: banners, loading, error } = useAppSelector((state) => state.banners);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10">Loading banners...</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <div className="relative mt-8 w-full">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 ml-4 mb-4">
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
        className="flex overflow-x-auto gap-4 scroll-smooth px-6 no-scrollbar"
      >
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner.banner_image}
            alt={banner.banner_name}
            title={banner.description}
            className="h-36 md:h-40 w-72 md:w-80 object-cover rounded-2xl flex-none"
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
  );
}
