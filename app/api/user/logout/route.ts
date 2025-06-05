import { NextResponse } from "next/server";

export async function POST() {
  // Supprime le cookie "userId" en le réinitialisant avec une date expirée
  const response = NextResponse.json({ message: "Déconnexion réussie" });

  response.cookies.set("userId", "", {
    path: "/",
    httpOnly: false, // idem que dans login
    sameSite: "lax",
    expires: new Date(0), // Expire immédiatement
  });

  return response;
}
