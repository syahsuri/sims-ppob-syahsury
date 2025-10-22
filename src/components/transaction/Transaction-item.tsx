// components/transaction/transaction-item.tsx
import { cn } from "@/lib/utils";

interface TransactionItemProps {
  amount: number;
  date: string;
  time: string;
  type: string;
  description: string;
  className?: string;
}

export function TransactionItem({
  amount,
  date,
  time,
  type,
  description,
  className,
}: TransactionItemProps) {
  const isPositive = amount > 0;
  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Math.abs(amount));

  return (
    <div
      className={cn(
        "w-full border border-gray-200 rounded-none p-3 flex justify-between items-start text-sm",
        className
      )}
    >
      <div className="flex flex-col">
        <span
          className={cn(
            "text-lg font-semibold",
            isPositive ? "text-green-600" : "text-red-600"
          )}
        >
          {isPositive ? "+" : "-"} {formattedAmount}
        </span>
        <p className="text-sm text-gray-500 mt-1">
          {date} {time} WIB
        </p>
      </div>

      <div className="text-right flex flex-col items-end">
        <p className="font-medium text-gray-900">{type}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
