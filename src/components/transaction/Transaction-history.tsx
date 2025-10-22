// components/transaction/transaction-history.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TransactionItem } from "./Transaction-item";

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  time: string;
  type: string;
  description: string;
}

const initialTransactions: Transaction[] = [
  {
    id: "1",
    amount: 10000,
    date: "17 Agustus 2023",
    time: "13:20",
    type: "Top Up Saldo",
    description: "",
  },
  {
    id: "2",
    amount: -40000,
    date: "17 Agustus 2023",
    time: "13:20",
    type: "Pulsa Prabayar",
    description: "",
  },
  {
    id: "3",
    amount: -10000,
    date: "17 Agustus 2023",
    time: "10:00",
    type: "Listrik Prabayar",
    description: "",
  },
  {
    id: "4",
    amount: 50000,
    date: "17 Agustus 2023",
    time: "10:00",
    type: "Top Up Saldo",
    description: "",
  },
  {
    id: "5",
    amount: 50000,
    date: "17 Agustus 2023",
    time: "20:00",
    type: "Top Up Saldo",
    description: "",
  },
];

const additionalTransactions: Transaction[] = [
  {
    id: "6",
    amount: -25000,
    date: "16 Agustus 2023",
    time: "15:30",
    type: "Pulsa Prabayar",
    description: "",
  },
  {
    id: "7",
    amount: 75000,
    date: "16 Agustus 2023",
    time: "09:15",
    type: "Top Up Saldo",
    description: "",
  },
  {
    id: "8",
    amount: -15000,
    date: "15 Agustus 2023",
    time: "14:45",
    type: "Listrik Prabayar",
    description: "",
  },
];

export function TransactionHistory() {
  const [showAll, setShowAll] = useState(false);
  const displayedTransactions = showAll
    ? [...initialTransactions, ...additionalTransactions]
    : initialTransactions;

  return (
    <div className="flex flex-col gap-3 w-full max-w-6xl mx-auto px-4 md:px-6">
      {displayedTransactions.map((t) => (
        <TransactionItem
          key={t.id}
          amount={t.amount}
          date={t.date}
          time={t.time}
          type={t.type}
          description={t.description}
        />
      ))}

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
    </div>
  );
}
