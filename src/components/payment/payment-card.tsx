import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBalance } from "@/redux/slices/BalanceSlice";
import { createTransaction } from "@/redux/slices/PaymentSlice";
import type { RootState } from "@/redux/store";
import { Calculator } from "lucide-react";
import { useNavigate } from "react-router";

interface PaymentCardProps {
  service_code: string;
  amount: number;
}

export default function PaymentCard({
  amount = 0,
  service_code,
}: PaymentCardProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.transactions);

  const navigate = useNavigate();

  const handlePay = async () => {
    if (service_code) {
      const result = await dispatch(createTransaction(service_code));
      if (createTransaction.fulfilled.match(result)) {
        dispatch(fetchBalance());
        navigate("/home");
      }
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="relative mb-4">
        <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="0"
          value={amount}
          readOnly
          className="w-full border border-gray-300 p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-none"
        />
      </div>

      <button
        onClick={handlePay}
        disabled={!amount}
        className={`w-full py-3 text-white font-semibold ${
          amount
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        {loading ? "Memproses..." : "Bayar"}
      </button>
    </div>
  );
}
