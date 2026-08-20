"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md rounded-xl border border-red-900 bg-black/90 p-8">
        <p className="mb-2 text-sm uppercase tracking-[0.4em] text-red-500">
          Restricted Area
        </p>

        <h1 className="mb-8 text-3xl font-bold uppercase">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm uppercase tracking-widest"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm uppercase tracking-widest"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full border border-white/20 bg-white/5 px-4 py-3 outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-800 px-6 py-3 font-bold uppercase tracking-widest transition hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p className="text-center text-sm text-red-400">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}