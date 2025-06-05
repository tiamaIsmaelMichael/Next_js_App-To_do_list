import { PrismaClient } from "@prisma/client";

// Utilisation d'une variable globale pour éviter plusieurs instances en développement
declare global {
  // autoriser la création d'une variable globale "prisma" dans l'espace global
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { prisma };
