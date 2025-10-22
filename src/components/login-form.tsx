import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import logo from "@/assets/Logo.png";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/slices/AuthSlice";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error} = useAppSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(login({ email, password }));

    if (login.fulfilled.match(result)) {
      navigate("/Home"); 
    } else {
      console.error("Login failed:", result.payload);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center justify-center gap-2">
            <img
              src={logo}
              alt="SIMS PPOB Logo"
              className="w-6 h-6 object-contain"
            />
            <h2 className="font-bold text-xl">SIMS PPOB</h2>
          </div>

          <h1 className="text-2xl font-bold">
            Masuk Atau Buat Akun Untuk Memulai
          </h1>
        </div>

        <Field>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="email"
              type="email"
              placeholder="Masukan Email Anda"
              required
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </Field>

        <Field>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="password"
              type="password"
              placeholder="Masukan Password Anda"
              required
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </Field>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Field>
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white w-full"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="text-center">
            Tidak punya akun? Registrasi{" "}
            <Link
              to="/sign-up"
              className="text-red-600 hover:text-red-700 font-semibold underline underline-offset-4"
            >
              di sini
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
