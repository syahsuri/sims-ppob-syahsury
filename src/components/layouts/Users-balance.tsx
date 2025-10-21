import { useState } from "react";
import bgWave from "@/assets/BackgroundSaldo.png";
import defaultAvatar from "@/assets/ProfilePhoto.png";
import { Eye, EyeOff } from "lucide-react";

interface UserbalanceProps {
  name: string;
  balanceHidden?: boolean;
  avatar?: string;
}

export default function Userbalance({
  name,
  balanceHidden = true,
  avatar = defaultAvatar,
}: UserbalanceProps) {
  const [hidden, setHidden] = useState(balanceHidden);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-6xl w-full flex justify-between items-center px-10 py-8 mx-auto">
        {/* LEFT SIDE */}
        <div className="flex flex-col w-[40%]">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover mb-4"
          />
          <p className="text-gray-600 text-base">Selamat datang,</p>
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative bg-[#F44336] text-white rounded-2xl w-[55%] p-6 overflow-hidden shadow-md">
          <img
            src={bgWave}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10">
            <p className="text-sm mb-2 opacity-90">Saldo anda</p>
            <h2 className="text-3xl font-bold tracking-wide mb-3">
              Rp {hidden ? "••••••••" : "250.000"}
            </h2>
            <button
              onClick={() => setHidden(!hidden)}
              className="text-sm hover:opacity-90 flex items-center gap-1"
            >
              Lihat Saldo{" "}
              {hidden ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
