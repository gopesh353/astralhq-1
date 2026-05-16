import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { useAuth } from "../lib/auth";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useToast } from "../hooks/useToast";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password required"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast("Welcome back, commander", "success");
      navigate("/dashboard");
    } catch (err) {
      toast(err.response?.data?.error?.message || "Login failed", "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg grid-bg p-4">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Rocket className="mx-auto mb-3 text-cyan" size={32} />
            <h1 className="font-display text-2xl font-bold">Mission Login</h1>
            <p className="text-sm text-muted">Access Ethara AI command center</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input label="Email" type="email" error={errors.email?.message} {...register("email")} />
            <Input label="Password" type="password" error={errors.password?.message} {...register("password")} />
            <Button type="submit" className="w-full" loading={isSubmitting}>
              Initialize Session
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            New crew?{" "}
            <Link to="/register" className="text-cyan hover:underline">
              Register
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-muted/70">
            Demo: admin@ethara.ai / Admin123!
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
