import "./globals.css";
import Layout from "@/components/Layout";
import Providers from "@/components/Providers";
import { Inter, Passion_One, Bellota } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const bellota = Bellota({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
}); 
const passionOne = Passion_One({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});


export const metadata = {
  title: "Ma To Do List",
  description: "Gère tes tâches simplement et efficacement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-white text-orange-700">
      <body
        className={`${bellota.className} min-h-screen flex flex-col font-sans selection:bg-orange-300 selection:text-white`}
      >
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
