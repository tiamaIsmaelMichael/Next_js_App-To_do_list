import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-white shadow-md border-b border-orange-300">
        <nav className="max-w-4xl mx-auto px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-orange-700 font-bold text-lg sm:text-xl hover:text-orange-900 transition"
          >
            MaToDoList
          </Link>
          <div className="space-x-4 sm:space-x-6">
            <Link
              href="/"
              className="text-orange-600 hover:text-orange-800 transition font-semibold text-sm sm:text-base"
            >
              Accueil
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-grow bg-white text-orange-700 min-h-[calc(100vh-96px)] max-w-4xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {children}
      </main>

      <footer className="bg-orange-500 text-white py-4 sm:py-6 mt-8 sm:mt-12">
        <div className="max-w-4xl w-full mx-auto px-3 sm:px-6 text-center text-xs sm:text-sm font-light">
          © {new Date().getFullYear()} MaToDoList. Tous droits réservés.
        </div>
      </footer>
    </>
  );
}
