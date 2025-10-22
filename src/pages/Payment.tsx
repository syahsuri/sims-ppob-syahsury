import Userbalance from "@/components/layouts/Users-balance";
import PaymentCard from "@/components/payment/payment-card";
import { fetchServices } from "@/redux/slices/ServiceSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

export default function Payment() {
  const dispatch = useDispatch<AppDispatch>();
  const { services, loading, error } = useSelector(
    (state: RootState) => state.service
  );

  const location = useLocation();

  const serviceCode = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("service_code");
  }, [location.search]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const selectedService = useMemo(() => {
    return services.find(
      (s) => s.code.toLowerCase() === serviceCode?.toLowerCase()
    );
  }, [services, serviceCode]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!selectedService)
    return <p className="text-center mt-10 text-gray-500">Service not found</p>;

  return (
    <div className="p-8 space-y-8">
      <Userbalance />
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl flex flex-col gap-6 px-4 md:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4 md:gap-0">
            <div className="flex flex-col items-center md:items-start">
              <PaymentItem service={selectedService} />
            </div>
          </div>
          <PaymentCard
            service_code={selectedService.code}
            amount={selectedService.tariff}
          />
        </div>
      </div>
    </div>
  );
}

const PaymentItem = ({
  service,
}: {
  service: { name: string; icon: string; code: string };
}) => {
  return (
    <div className="flex items-center gap-4">
      <img
        src={service.icon}
        alt={service.name}
        className="w-14 h-14 object-contain"
      />
      <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
        {service.name}
      </h2>
    </div>
  );
};
