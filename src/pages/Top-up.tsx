import { useState } from "react";
import Userbalance from "@/components/layouts/Users-balance";
import { NominalInput, PaymentRow } from "@/components/topup/topup-list";

const presetNominals = [10000, 20000, 50000, 100000, 250000, 500000];

export default function Topup() {
  const [nominal, setNominal] = useState<number | null>(null);

  return (
    <div className="p-8 space-y-8">
      <Userbalance />

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
          
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
            <NominalInput value={nominal} onChange={setNominal} />
            <PaymentRow nominal={nominal} onSelect={setNominal} presetValues={presetNominals.slice(0, 3)} />
          </div>

          <PaymentRow nominal={nominal} onSelect={setNominal} presetValues={presetNominals.slice(3)} includePayButton />
        </div>
      </div>
    </div>
  );
}
