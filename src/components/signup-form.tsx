import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/Logo.png";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { register } from "@/redux/slices/AuthSlice";

export function SignupForm({ className, ...props }: React.ComponentProps<"form">) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi tidak sama");
      return;
    }

    const { email, first_name, last_name, password } = formData;

    const result = await dispatch(register({ email, first_name, last_name, password }));
    if (register.fulfilled.match(result)) {
      alert("Registrasi berhasil, silakan login.");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center text-center gap-3 mb-2">
          <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="SIMS PPOB Logo" className="w-7 h-7 object-contain" />
            <h2 className="font-bold text-xl">SIMS PPOB</h2>
          </div>
          <h1 className="text-2xl font-bold leading-tight">Lengkapi Data Untuk Membuat Akun</h1>
        </div>

        <Field>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input id="email" type="email" placeholder="Masukan Email Anda" required className="pl-10"
              value={formData.email} onChange={handleChange} />
          </div>
        </Field>

        <Field>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input id="first_name" type="text" placeholder="Nama Depan" required className="pl-10"
              value={formData.first_name} onChange={handleChange} />
          </div>
        </Field>

        <Field>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input id="last_name" type="text" placeholder="Nama Belakang" required className="pl-10"
              value={formData.last_name} onChange={handleChange} />
          </div>
        </Field>

        <Field>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input id="password" type="password" placeholder="Masukan Password Anda" required className="pl-10"
              value={formData.password} onChange={handleChange} />
          </div>
        </Field>

        <Field>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input id="confirmPassword" type="password" placeholder="Konfirmasi Password" required className="pl-10"
              value={formData.confirmPassword} onChange={handleChange} />
          </div>
        </Field>

        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white font-semibold">
          {loading ? "Processing..." : "Create Account"}
        </Button>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <FieldDescription className="text-center">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold underline underline-offset-4">
            Sign in
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
