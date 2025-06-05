"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";


type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
};

const email = localStorage.getItem("email");

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-user-email": email || "",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          console.error("Erreur de récupération :", res.statusText);
        }
      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/user/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <>
      {/* Zone de détection (1px de large, collée à gauche) */}
      <div
        className="fixed top-0 left-0 h-full w-2 z-30"
        onMouseEnter={() => setIsSidebarVisible(true)}
      />

      {/* Sidebar visible ou non */}
      <div
        className={`fixed top-0 left-0 h-full w-56 sm:w-64 bg-white border-r border-gray-200 shadow-md p-4 sm:p-6 z-40 transition-transform duration-300 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        onMouseLeave={() => setIsSidebarVisible(false)}
      >
        {loading ? (
          <p className="text-sm text-gray-500">Chargement...</p>
        ) : !user ? (
          <p className="text-sm text-red-500">Non connecté</p>
        ) : (
          <>
            <h2 className="text-base sm:text-lg font-semibold mb-2 text-orange-600">
              👤 Utilisateur
            </h2>
            <p className="text-xs sm:text-sm text-gray-700">
              {user.firstName || "Prénom"} {user.lastName || "Nom"}
            </p>
            <p className="text-xs sm:text-sm text-gray-600">{user.email}</p>

            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded shadow-sm w-full text-xs sm:text-sm"
            >
              Se déconnecter
            </button>
          </>
        )}
      </div>
    </>
  );
}
