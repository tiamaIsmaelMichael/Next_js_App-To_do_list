import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export default async function StatsPage({ req }: { req: NextRequest }) {
  const user = await getUserFromCookie(req);

  if (!user) {
    redirect("/login");
  }

  const totalTasks = await prisma.task.count({
    where: { userId: user.id },
  });

  const completedTasks = await prisma.task.count({
    where: {
      userId: user.id,
      completed: true,
    },
  });

  const pendingTasks = await prisma.task.count({
    where: {
      userId: user.id,
      completed: false,
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center items-start py-16 px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-8 border">
        <h1 className="text-3xl font-bold text-orange-600 mb-8 text-center">
          📊 Statistiques
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="bg-orange-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-orange-700">Total</h2>
            <p className="text-3xl font-bold text-orange-800">{totalTasks}</p>
          </div>

          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-700">Accomplies</h2>
            <p className="text-3xl font-bold text-green-800">
              {completedTasks}
            </p>
          </div>

          <div className="bg-red-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-red-700">À faire</h2>
            <p className="text-3xl font-bold text-red-800">{pendingTasks}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
