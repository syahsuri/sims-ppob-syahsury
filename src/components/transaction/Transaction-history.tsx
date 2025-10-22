import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTransactions, type Transaction } from "@/redux/slices/TransactionSlice";
import { TransactionItem } from "./Transaction-item";

export function TransactionHistory() {
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(state => state.transactions);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading) return <p>Memuat transaksi...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const displayedTransactions = showAll ? records : records.slice(0, 5);

  return (
    <div className="flex flex-col gap-3 w-full max-w-6xl mx-auto px-4 md:px-6">
      {displayedTransactions.map((t: Transaction) => (
        <TransactionItem
          key={t.id}
          amount={t.amount}
          date={t.date}
          time={t.time}
          type={t.type}
          description={t.description}
        />
      ))}

      {records.length > 5 && (
        <Button
          variant="ghost"
          className="w-full justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" /> Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" /> Show More
            </>
          )}
        </Button>
      )}
    </div>
  );
}
