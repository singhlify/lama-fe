"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components";
import { useLogin } from "@/apis";
import { showToast } from "../utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const defaultLoginValues = {
  email: "",
};

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
});

export default function Home() {
  const router = useRouter();
  const { mutateAsync: login, isPending } = useLogin();

  const { handleSubmit: handleLoginSubmit, control: loginControl } = useForm({
    defaultValues: defaultLoginValues,
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    try {
      const response = await login(data);
      const result = response?.data;
      if (result?.userId) {
        localStorage.setItem("userId", result?.userId);
        localStorage.setItem("fullName", result?.fullName);
        localStorage.setItem("email", result?.email);
        axios.defaults.headers.common["Authorization"] = result?.userId;
        showToast({ message: "Welcome!" });
        router.replace("/projects");
      } else {
        showToast({ type: "error", message: response?.message });
      }
    } catch (error) {
      showToast({ type: "error", message: error?.message });
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      router.replace("/projects");
    }
  }, []);

  return (
    <main>
      <form
        className="w-96 my-10 mx-auto flex flex-col items-center justify-center gap-4"
        onSubmit={handleLoginSubmit(handleLogin)}
      >
        <Input
          name="email"
          label="Enter Email"
          placeholder="Type here"
          control={loginControl}
        />

        <button disabled={isPending} type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </main>
  );
}
