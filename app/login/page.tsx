"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/tasks";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Erreur lors de la connexion.");
    } else {
      // localStorage.setItem("userId", data.userId);
      localStorage.setItem("email", email);
      // localStorage.setItem("firstName", data.firstName || "");
      // localStorage.setItem("lastName", data.lastName || "");
      console.log("Connexion réussie, redirection vers :", callbackUrl);
      router.push(callbackUrl);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-2 sm:px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md space-y-6 border border-gray-300"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-500 text-center">
          Connexion
        </h1>

        {error && (
          <p className="text-red-600 text-xs sm:text-sm text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded shadow transition duration-200 text-sm sm:text-base"
        >
          Se connecter
        </button>

        <p className="text-xs sm:text-sm text-gray-600 text-center">
          Pas encore de compte ?{" "}
          <a
            href="/register"
            className="text-orange-500 hover:underline font-medium"
          >
            S’inscrire
          </a>
        </p>
      </form>
    </main>
  );
}
