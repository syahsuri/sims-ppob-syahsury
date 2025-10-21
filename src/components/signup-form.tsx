import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.png";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Lock, Mail, User } from "lucide-react";
import { Link } from "react-router";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn("flex flex-col gap-4", className)} // 🔹 kurangi jarak antar field
      {...props}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3 mb-2">
          <div className="flex items-center justify-center gap-2">
            <img
              src={logo}
              alt="SIMS PPOB Logo"
              className="w-7 h-7 object-contain"
            />
            <h2 className="font-bold text-xl">SIMS PPOB</h2>
          </div>

          <h1 className="text-2xl font-bold leading-tight">
            Lengkapi Data Untuk Membuat Akun
          </h1>
        </div>

        {/* Email */}
        <Field>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="email"
              type="email"
              placeholder="Masukan Email Anda"
              required
              className="pl-10"
            />
          </div>
        </Field>

        {/* Nama Depan */}
        <Field>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="first-name"
              type="text"
              placeholder="Nama Depan"
              required
              className="pl-10"
            />
          </div>
        </Field>

        {/* Nama Belakang */}
        <Field>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="last-name"
              type="text"
              placeholder="Nama Belakang"
              required
              className="pl-10"
            />
          </div>
        </Field>

        {/* Password */}
        <Field>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="password"
              type="password"
              placeholder="Masukan Password Anda"
              required
              className="pl-10"
            />
          </div>
        </Field>

        {/* Konfirmasi Password */}
        <Field>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              id="confirm-password"
              type="password"
              placeholder="Konfirmasi Password"
              required
              className="pl-10"
            />
          </div>
        </Field>

        {/* Tombol Create Account */}
        <Field>
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            Create Account
          </Button>
        </Field>

        {/* Link ke Login */}
        <Field>
          <FieldDescription className="text-center">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 font-semibold underline underline-offset-4"
            >
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
