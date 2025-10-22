interface Service {
    name: string;
    icon: string;
  }
  
  interface ServiceListProps {
    services: Service[];
  }
  
  export default function ServiceList({ services }: ServiceListProps) {
    return (
      <div className="flex justify-center">
        <div className="flex overflow-x-auto gap-2 md:gap-0 no-scrollbar px-2">
          {services.map((service) => (
            <div
              key={service.name}
              className="shrink-0 flex flex-col items-center justify-center text-center w-20 md:w-24"
            >
              <img src={service.icon} alt={service.name} className="w-14 h-12 object-contain" />
              <p className="mt-1 text-sm font-medium text-gray-700">
                {service.name.split(" ").map((word, i) => (
                  <span key={i}>
                    {word}
                    {i !== service.name.split(" ").length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  