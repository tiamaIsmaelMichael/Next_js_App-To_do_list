import { NextRequest } from "next/server";
import { prisma } from "./prisma";

// Récupère l'utilisateur à partir du cookie userId
export async function getUserFromCookie(req: NextRequest) {
  const userIdValue = req.cookies.get("userId")?.value;

  // Vérifie si le cookie est présent et valide
  if (!userIdValue || isNaN(Number(userIdValue))) {
    return null;
  }

  // Recherche l'utilisateur en base de données
  const user = await prisma.user.findUnique({
    where: { id: Number(userIdValue) },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });

  return user;
}
