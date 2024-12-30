import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/Utils/Nav";
import { AuthProvider } from "@/Utils/Context/AuthContext";
import { getHref } from "@/Utils/urlHelpers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyGhs",
  description: "Recursos para GHS y Seguridad Química en Minería",
};

const style: React.CSSProperties = {
  display: "grid",
  minHeight: "100dvh",
  gridTemplateRows: "auto 1fr auto",
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
          <div>
            <Nav></Nav>
            <main className="m-auto">{children}</main>
           
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
