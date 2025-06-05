"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // ✅ État pour message de succès

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Erreur lors de l'inscription.");
    } else {
      setSuccess("Inscription réussie ! Redirection vers la connexion...");
      setTimeout(() => {
        router.push("/login");
      }, 2000); // ✅ Redirection après 2 secondes
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-2 sm:px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded-2xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md space-y-6 border border-gray-300"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-500 text-center">
          Inscription
        </h1>

        {error && (
          <p className="text-red-600 text-xs sm:text-sm text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-xs sm:text-sm text-center">
            {success}
          </p>
        )}

        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full border rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
          required
        />

        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full border rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
          required
        />

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

        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded shadow transition duration-200 text-sm sm:text-base"
        >
          S'inscrire
        </button>

        <p className="text-xs sm:text-sm text-gray-600 text-center">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="text-orange-500 hover:underline font-medium"
          >
            Se connecter
          </Link>
        </p>
      </form>
    </main>
  );
}
