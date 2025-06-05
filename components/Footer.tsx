export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-gray-500 py-4 mt-8 w-full px-2 sm:px-4">
      <p className="text-xs sm:text-sm">
        © {new Date().getFullYear()} To Do App – Tous droits réservés
      </p>
    </footer>
  );
}
