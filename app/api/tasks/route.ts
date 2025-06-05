// GET: liste des tâches | POST: ajouter une tâche
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getUserFromCookie(req);

  if (!user)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const user = await getUserFromCookie(req);
  if (!user)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { text, description } = await req.json();

  const task = await prisma.task.create({
    data: {
      text,
      description,
      userId: user.id,
    },
  });

  return NextResponse.json(task);
}
