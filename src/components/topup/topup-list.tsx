import { Calculator } from "lucide-react";
import { topup } from "@/redux/slices/TopupSlice";
import type { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBalance } from "@/redux/slices/BalanceSlice";

interface NominalInputProps {
  value: number | null;
  onChange: (value: number) => void;
}

export function NominalInput({ value, onChange }: NominalInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value.replace(/\D/g, ""));
    onChange(val > 0 ? val : 0);
  };

  return (
    <div className="relative flex-1 min-w-[120px]">
      <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Nominal Top Up"
        value={value || ""}
        onChange={handleChange}
        className="w-full border border-gray-300 p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-none"
      />
    </div>
  );
}

interface NominalButtonProps {
  value: number;
  selected: number | null;
  onClick: (value: number) => void;
}

export function NominalButton({ value, selected, onClick }: NominalButtonProps) {
  const isSelected = selected === value;
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`w-32 md:w-36 px-3 py-2 border rounded-none ${
        isSelected
          ? "bg-red-500 text-white border-red-500"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
    >
      Rp.{value / 1000}k
    </button>
  );
}

interface PaymentRowProps {
  nominal: number | null;
  onSelect: (value: number) => void;
  presetValues: number[];
  includePayButton?: boolean;
}

export function PaymentRow({ nominal, onSelect, presetValues, includePayButton }: PaymentRowProps) {
  const dispatch = useAppDispatch(); 
  const { loading } = useAppSelector((state: RootState) => state.topup);

  const handleTopup = async () => {
    if (nominal) {
      const result = await dispatch(topup(nominal));
      if (topup.fulfilled.match(result)) {
        dispatch(fetchBalance());
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
      {includePayButton && (
        <button
          type="button"
          disabled={!nominal || loading}
          onClick={handleTopup}
          className={`flex-1 py-3 border rounded-none font-semibold text-white ${
            nominal
              ? "bg-red-500 hover:bg-red-600 border-red-500"
              : "bg-gray-300 cursor-not-allowed border-gray-300"
          }`}
        >
          {loading ? "Memproses..." : "Bayar"}
        </button>
      )}

      {presetValues.map((value) => (
        <NominalButton key={value} value={value} selected={nominal} onClick={onSelect} />
      ))}
    </div>
  );
}

