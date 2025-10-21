import { useState } from "react";
import Userbalance from "@/components/layouts/Users-balance";
import { Calculator } from "lucide-react";

const presetNominals = [10000, 20000, 50000, 100000, 250000, 500000];

export default function Topup() {
  const [nominal, setNominal] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/\D/g, ""));
    setNominal(value > 0 ? value : null);
  };

  const handlePresetClick = (value: number) => {
    setNominal(value);
  };

  return (
    <div className="p-8 space-y-8">
      <Userbalance name="Kristanto Wibowo" />

      {/* Content Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl flex flex-col gap-6 px-4 md:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4 md:gap-0">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-gray-600 text-base">Silahkan Masukan</p>
              <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
                Nominal Top-up
              </h2>
            </div>
          </div>

          {/* Row 1: Input + first 3 buttons */}
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            <div className="relative flex-1 min-w-[120px]">
              <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Nominal Top Up"
                value={nominal ?? ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-none"
              />
            </div>

            {presetNominals.slice(0, 3).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handlePresetClick(value)}
                className={`w-32 md:w-36 px-3 py-2 border rounded-none ${
                  nominal === value
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Rp.{value / 1000}k
              </button>
            ))}
          </div>

          {/* Row 2: Bayar + next 3 buttons */}
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            <button
              type="button"
              disabled={!nominal}
              className={`flex-1 py-3 border rounded-none font-semibold text-white ${
                nominal ? "bg-red-500 hover:bg-red-600 border-red-500" : "bg-gray-300 cursor-not-allowed border-gray-300"
              }`}
            >
              Bayar
            </button>

            {presetNominals.slice(3).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handlePresetClick(value)}
                className={`w-32 md:w-36 px-3 py-2 border rounded-none ${
                  nominal === value
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                Rp.{value / 1000}k
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
