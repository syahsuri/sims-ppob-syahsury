import BannerScroll from "@/components/homepage/Banner-list";
import ServiceList from "@/components/homepage/Service-list";
import Userbalance from "@/components/layouts/Users-balance";
import { features as services } from "@/data/ServiceData";

export default function Homepage() {
  return (
    <div className="px-4 md:px-8 py-6 space-y-8">
      <Userbalance name="Kristanto Wibowo" />

      <ServiceList services={services} />

      <BannerScroll/>
    </div>
  );
}
