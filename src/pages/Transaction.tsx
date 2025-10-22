import Userbalance from "@/components/layouts/Users-balance";
import { TransactionHistory } from "@/components/transaction/Transaction-history";

export default function Transaction() {
  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      {/* User Balance */}
      <Userbalance />

      {/* Header aligned with TransactionHistory cards */}
      <div className="px-4 md:px-6">
        <p className="text-gray-900 font-bold text-base">
          Semua Transaksi
        </p>
      </div>

      {/* Transaction History */}
      <TransactionHistory />
    </div>
  );
}
