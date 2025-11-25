import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

// ----------------------
// ✅ ZOD Schema
// ----------------------
const LoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Login = () => {
  // ----------------------
  // ✅ Form Setup (React Hook Form + Zod)
  // ----------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  // ----------------------
  // ✅ TanStack Query Mutation (API call)
  // ----------------------
  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      return res.json();
    },
  });

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0C1D] px-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl w-full max-w-md p-8">
        
        {/* Platform Name */}
        <h1 className="text-white text-3xl font-semibold text-center mb-6 tracking-wide">
          📚 BookSwap
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-white block mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 rounded-md bg-[#ffffff15] border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-white block mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-3 rounded-md bg-[#ffffff15] border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Error from API */}
          {loginMutation.isError && (
            <p className="text-red-400 text-sm text-center">
              {loginMutation.error.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-md font-medium"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
