import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/Utils/Nav";
import { AuthProvider } from "@/Utils/Context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyGhs",
  description: "Recursos para GHS y Seguridad Química en Minería",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-white'>
        <AuthProvider>
          <Nav></Nav>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
