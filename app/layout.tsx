import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import Layout from "./(overview)/layout";
import Navigation from "./ui/dashboard/navs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Győződj meg róla, hogy az útvonal helyes!
import { AuthProvider } from "@/app/context/AuthProvide"; // Az új Client Component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetApp",
  description: "MeetApp web app for community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        {/* Session-t átadjuk az AuthProvider-nek */}
        <AuthProvider session={session}>
          <header>
            <Navigation />
          </header>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
