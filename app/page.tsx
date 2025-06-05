"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === "authenticated") {
      router.push("/tasks");
    } else {
      router.push("/login?callbackUrl=/tasks");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-2 sm:px-4">
      <section className="bg-white border border-gray-300 rounded-2xl shadow-xl p-6 sm:p-10 max-w-md sm:max-w-3xl w-full text-center space-y-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-orange-500 drop-shadow-md">
          Bienvenue sur Ma To Do List 📝
        </h1>

        <p className="text-base sm:text-lg text-gray-700 max-w-xl mx-auto">
          Organise tes tâches avec une interface simple, claire et chaleureuse.
          Ajoute, filtre, modifie et coche tes tâches facilement !
        </p>

        <button
          onClick={handleClick}
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-lg transition duration-300 text-base sm:text-lg"
        >
          Voir mes tâches
        </button>
      </section>
    </main>
  );
}
