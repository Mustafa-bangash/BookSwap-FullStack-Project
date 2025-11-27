import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FiLogIn } from "react-icons/fi";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data,
      
      );
      return res.data;
    },
    onSuccess: (data) => {
      alert("Login Successful!");
      console.log("Success:", data);
    },
    onError: (err) => {
      alert("Login Failed");
      console.log("Error:", err);
    },
  });

  const onSubmit = (data) => loginMutation.mutate(data);

  return (
    <div className="h-full w-full mt-55 bg-[#0c1222] flex items-center justify-center px-4">

      {/* LEFT HEADER (Only Project Name as requested) */}
      <div className="absolute top-10 left-10">
        <h1 className="text-white text-2xl font-semibold flex items-center gap-2">
          📚 BookSwap
        </h1>
      </div>

      {/* MAIN LOGIN CARD */}
      <div className="bg-[#111827] border border-gray-700 rounded-3xl shadow-xl w-full max-w-xl p-10">

        {/*  TOP TABS */}
        <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
          <div className="flex items-center gap-2 text-white text-lg font-semibold">
            <FiLogIn className="text-gray-300" />
            Log in
          </div>

          
        </div>

        <p className="text-gray-300 mb-6">
          Use your email and password to access your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

         
          <div>
            <label className="text-gray-300 block mb-2 pr-[470px] text-[18px]">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 bg-[#0c1222] border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

        
          <div>
            <label className="text-gray-300 block mb-2 pr-[470px] text-[18px]">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full px-4 py-3 bg-[#0c1222] border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>
          
             <a href="/register" className=" text-sm hover:text-white">
                 Create your account
             </a>
             
            

            <button className="hover:text-white">Forgot password?</button>
          </div>

          {/* LOGIN BUTTON */}
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-lg transition"
          >
            <FiLogIn />
            {loginMutation.isPending ? "Logging in..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};
