"use client";

import { useState, useEffect } from "react";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import TaskFilter from "@/components/TaskFilter";
import UserInfo from "@/components/UserInfo";
import { FiBarChart2 } from "react-icons/fi";
import { motion } from "framer-motion";



type Task = {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  createdAt: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "done" | "todo">(
    "all"
  );
  const [filterDate, setFilterDate] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (text: string, description: string) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, description }),
    });

    if (res.ok) {
      const newTask = await res.json();
      setTasks([newTask, ...tasks]);
    }
  };

  const updateTask = async (updated: Task) => {
    const res = await fetch(`/api/tasks/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      const updatedTask = await res.json();
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setEditTask(null);
    }
  };

  const deleteTask = async (id: number) => {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updated = { ...task, completed: !task.completed };
    await updateTask(updated);
  };

  let filtered = tasks.filter((task) => {
    if (filterStatus === "done") return task.completed;
    if (filterStatus === "todo") return !task.completed;
    return true;
  });

  if (filterDate) {
    filtered = filtered.filter((task) => {
      const taskDate = new Date(task.createdAt).toISOString().slice(0, 10);
      return taskDate === filterDate;
    });
  }

  // ✅ Calcul des statistiques
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const lastCreatedTask =
    tasks.length > 0
      ? tasks.reduce((latest, task) =>
          new Date(task.createdAt) > new Date(latest.createdAt) ? task : latest
        )
      : null;

  return (
    <div className="flex flex-col min-h-screen mt-15">
      <UserInfo />

      <main className="ml-0">
        <div className="max-w-7xl bg-white rounded-2xl shadow-xl p-4 sm:p-8 border border-orange-200 flex flex-col lg:flex-row gap-6 lg:gap-10 mx-auto">
          {/* Formulaire à gauche */}
          <section className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-600 drop-shadow-md mb-6">
              📝 Ma To Do List
            </h1>
            <TaskForm
              addTask={addTask}
              editTask={editTask}
              updateTask={updateTask}
            />
          </section>

          {/* Filtre + Historique à droite */}
          <section className="w-full lg:w-1/2 flex flex-col">
            <TaskFilter current={filterStatus} setFilter={setFilterStatus} />

            <div className="flex flex-wrap gap-4 items-center mt-4 mb-6 justify-start">
              <label
                htmlFor="dateFilter"
                className="text-sm font-medium text-gray-700 flex items-center gap-1"
              >
                📅 Filtrer par date :
              </label>
              <input
                type="date"
                id="dateFilter"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="border border-orange-300 rounded-md px-3 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={() => setFilterDate("")}
                className="text-sm text-red-500 hover:underline"
              >
                Réinitialiser
              </button>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-orange-500 drop-shadow-sm border-b pb-2 border-orange-200 mb-4">
              📚 Historique des tâches
            </h2>

            <ul className="overflow-y-auto max-h-[60vh] space-y-3">
              {filtered.length > 0 ? (
                filtered.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                    onEdit={() => setEditTask(task)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500 mt-6">
                  Aucune tâche à afficher.
                </p>
              )}
            </ul>
          </section>
        </div>

        {/* ✅ Section des statistiques */}
        <section className="max-w-4xl mx-auto mt-10 bg-gray-50 border border-gray-300 rounded-xl shadow p-6">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl sm:text-2xl font-semibold text-orange-500 drop-shadow-sm border-b pb-2 border-orange-200 mb-4 flex items-center gap-2"
          >
            <FiBarChart2 className="text-orange-400" />
            📊 Statistiques
          </motion.h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm sm:text-base">
            <li>
              📌 Total de tâches : <strong>{totalTasks}</strong>
            </li>
            <li>
              ✅ Tâches terminées : <strong>{completedTasks}</strong>
            </li>
            <li>
              🕒 Tâches à faire : <strong>{pendingTasks}</strong>
            </li>
            <li>
              🆕 Dernière tâche créée :
              <strong>
                {lastCreatedTask
                  ? ` ${new Date(lastCreatedTask.createdAt).toLocaleDateString(
                      "fr-FR"
                    )}`
                  : " Aucune"}
              </strong>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
