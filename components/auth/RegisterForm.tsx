"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RegisterSchema } from "@/lib/schema";
import { instance } from "@/lib/config";
import { useToast } from "../ui/use-toast";
import { ReloadIcon } from "../common";
import { useState } from "react";

export function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: RegisterSchema) {
    setLoading(true);
    await instance
      .post("/auth/register", data)
      .catch((err) => {
        if (!err.response) {
          toast({
            title: "Error",
            description: "Network Error",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Error",
          description: err.response.data.message,
          variant: "destructive",
        });
      })
      .then((res) => {
        if (!res) return;

        toast({
          title: "Success",
          description: res.data.message,
        });
      });
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:w-4/5 xl:w-3/5 w-full flex flex-col gap-4"
    >
      <h2 className="sr-only">Register Form</h2>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          {...register("email")}
          className={`rounded-[6px] border-[1px] border-solid ${errors.email ? "border-destructive" : "border-[#CDDDE1]"}`}
        />
        {errors.email && (
          <span className="text-[#DA0A1E] text-xs font-medium">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Your Password"
          {...register("password")}
          className={`rounded-[6px] border-[1px] border-solid ${errors.password ? "border-destructive" : "border-[#CDDDE1]"}`}
        />
        {errors.password && (
          <span className="text-[#DA0A1E] text-xs font-medium">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Your Password"
          {...register("confirmPassword")}
          className={`rounded-[6px] border-[1px] border-solid ${errors.confirmPassword ? "border-destructive" : "border-[#CDDDE1]"}`}
        />
        {errors.confirmPassword && (
          <span className="text-[#DA0A1E] text-xs font-medium">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        className="bg-primary text-white"
        disabled={loading}
      >
        {loading && (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin fill-white" />
        )}
        {!loading && <>{"Sign Up"}</>}
      </Button>
    </form>
  );
}
