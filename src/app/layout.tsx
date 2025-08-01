import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/Utils/Nav";
import { AuthProvider } from "@/Utils/Context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e-sbap",
  description: "Monitoreo a la regulación en biodiversidad y el SBAP",
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
