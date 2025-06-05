type Props = {
  current: "all" | "done" | "todo";
  setFilter: (f: "all" | "done" | "todo") => void;
};

export default function TaskFilter({ current, setFilter }: Props) {
  const baseClasses =
    "px-4 py-2 rounded-full font-medium transition duration-200";
  const selectedClasses = "bg-orange-500 text-white shadow-md";
  const unselectedClasses = "bg-orange-100 text-orange-600 hover:bg-orange-200";

  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        onClick={() => setFilter("all")}
        className={`${baseClasses} ${
          current === "all" ? selectedClasses : unselectedClasses
        }`}
      >
        Toutes
      </button>
      <button
        onClick={() => setFilter("done")}
        className={`${baseClasses} ${
          current === "done" ? selectedClasses : unselectedClasses
        }`}
      >
        Faites
      </button>
      <button
        onClick={() => setFilter("todo")}
        className={`${baseClasses} ${
          current === "todo" ? selectedClasses : unselectedClasses
        }`}
      >
        À faire
      </button>
    </div>
  );
}
