import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // import Prisma client

export async function GET(req: NextRequest) {
  const email = req.headers.get("x-user-email");

  if (!email) {
    return NextResponse.json({ message: "Email manquant" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        // autres champs à retourner
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
