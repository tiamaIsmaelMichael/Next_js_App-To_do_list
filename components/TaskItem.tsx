type Task = {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  createdAt: string; // ✅
};

type Props = {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: () => void;
};

export default function TaskItem({ task, onDelete, onToggle, onEdit }: Props) {
  return (
    <li className="w-full bg-white border border-orange-300 rounded-lg shadow-sm hover:shadow-md transition p-4">
      <div className="flex justify-between items-start flex-wrap gap-4">
        {/* Titre de la tâche */}
        <div className="flex-1 min-w-[200px]">
          <h3
            className={`text-lg font-semibold mb-1 ${
              task.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {task.text}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {task.description}
            </p>
          )}

          {/* ✅ Date de création */}
          <div className="text-xs text-gray-400 mt-2">
            📅 Créée le {new Date(task.createdAt).toLocaleDateString("fr-FR")}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 items-center flex-shrink-0">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800"
            aria-label="Modifier la tâche"
          >
            ✏️
          </button>

          <button
            onClick={() => onToggle(task.id)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              task.completed
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            aria-label={
              task.completed ? "Annuler la tâche" : "Marquer comme terminée"
            }
          >
            {task.completed ? "↩️" : "✔️"}
          </button>

          <button
            onClick={() => {
              if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
                onDelete(task.id);
              }
            }}
            className="text-red-600 hover:text-red-800"
            aria-label="Supprimer la tâche"
          >
            🗑️
          </button>
        </div>
      </div>
    </li>
  );
}
