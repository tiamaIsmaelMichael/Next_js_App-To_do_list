"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="w-full bg-orange-600 text-white px-3 sm:px-6 py-3 sm:py-4 flex items-center">
      <div className="flex-1 font-bold text-lg sm:text-xl truncate">
        MaToDoList
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <Link
          href="/"
          className={`hover:underline ${
            isActive("/") ? "underline" : ""
          } text-sm sm:text-base`}
        >
          Accueil
        </Link>
      </div>
    </nav>
  );
}
