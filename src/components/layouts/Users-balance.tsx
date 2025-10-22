import { useEffect, useState } from "react";
import bgWave from "@/assets/BackgroundSaldo.png";
import defaultAvatar from "@/assets/ProfilePhoto.png";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/slices/AuthSlice";
import { fetchBalance } from "@/redux/slices/BalanceSlice";

export default function Userbalance() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const { balance, loading: balanceLoading } = useAppSelector(
    (state) => state.balance
  );

  useEffect(() => {
    dispatch(getProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const name = user ? `${user.first_name} ${user.last_name}` : "Pengguna";
  const avatar = user?.profile_image || defaultAvatar;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center px-4 md:px-10 py-6 gap-6 md:gap-0">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center md:items-start md:w-2/5">
          {loading ? (
            <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse mb-4" />
          ) : (
            <img
              src={avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
          )}
          <p className="text-gray-600 text-base">
            {loading ? "Memuat data..." : "Selamat datang,"}
          </p>
          <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
            {loading ? "Loading..." : name}
          </h2>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative bg-[#F44336] text-white rounded-2xl w-full md:w-3/5 p-6 overflow-hidden shadow-md">
          <img
            src={bgWave}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 flex flex-col items-center md:items-start">
            <p className="text-sm mb-2 opacity-90">Saldo anda</p>
            <h2 className="text-3xl font-bold tracking-wide mb-3">
              {hidden
                ? "••••••••"
                : balanceLoading
                ? "Memuat..."
                : new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(balance)}
            </h2>

            <button
              onClick={() => setHidden(!hidden)}
              className="text-sm hover:opacity-90 flex items-center gap-1"
            >
              {hidden ? "Lihat Saldo" : "Sembunyikan Saldo"}{" "}
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
