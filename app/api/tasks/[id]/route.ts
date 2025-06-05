import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookie } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromCookie(req);
  if (!user)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { text, description, completed } = await req.json();

  const updated = await prisma.task.update({
    where: { id: Number(params.id), userId: user.id },
    data: { text, description, completed },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromCookie(req);
  if (!user)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  await prisma.task.delete({
    where: { id: Number(params.id), userId: user.id },
  });

  return NextResponse.json({ success: true });
}
