// components/ServiceList.tsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "@/redux/slices/ServiceSlice";
import type { RootState, AppDispatch } from "@/redux/store";
import { Link } from "react-router";

interface ServiceListProps {}

export default function ServiceList(props: ServiceListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector((state: RootState) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading services...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex justify-center">
      <div className="flex items-start overflow-x-auto gap-2 md:gap-0 no-scrollbar px-2">
        {services.map((service) => (
          <Link
            key={service.name}
            to={`/payment?service_code=${service.code}`}
            className="shrink-0 flex flex-col items-center justify-center text-center w-20 md:w-24"
          >
            <img src={service.icon} alt={service.name} className="w-14 h-14 object-contain" />
            <p className="mt-1 text-sm font-medium text-gray-700">
              {service.name.split(" ").map((word, i) => (
                <span key={i}>
                  {word}
                  {i !== service.name.split(" ").length - 1 && <br />}
                </span>
              ))}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
