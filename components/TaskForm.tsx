import { useState, useEffect } from "react";


type Task = {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  createdAt: Date;
};

type Props = {
  addTask: (text: string, description: string) => void;
  editTask: Task | null;
  updateTask: (task: Task) => void;
};

export default function TaskForm({ addTask, editTask, updateTask }: Props) {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTask) {
      setText(editTask.text);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;

    if (editTask) {
      updateTask({ ...editTask, text, description });
    } else {
      addTask(text, description);
    }

    setText("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-orange-200 shadow-md rounded-xl p-6 mb-6 w-full"
    >
      <h2 className="text-xl font-semibold text-orange-600 mb-4">
        {editTask ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
      </h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-gray-300 focus:border-orange-400 focus:ring-orange-200 rounded px-4 py-2 shadow-sm focus:outline-none w-full"
        />

        <textarea
          placeholder="Description (optionnelle)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 focus:border-orange-400 focus:ring-orange-200 rounded px-4 py-2 resize-none shadow-sm focus:outline-none w-full"
          rows={3}
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded shadow-md transition w-full sm:w-fit"
        >
          {editTask ? "Modifier la tâche" : "Ajouter la tâche"}
        </button>
      </div>
    </form>
  );
}
