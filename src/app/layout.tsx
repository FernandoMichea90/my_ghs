import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <nav className="bg-white fixed top-0 left-0 right-0 z-10 border-b border-primary">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/">
                    <img
                      className="h-8"
                      src="./icono.png"
                      alt="Icon"
                    />
                  </a>
                </div>
              </div>
              <div className="hidden md:flex items-center ml-6 text-red-500 font-bold text-center">
                Plataforma #1 sobre GHS. Utilizada por más de 300 empresas
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <a href="/nosotros" className="text-gray-700 hover:text-gray-900">
                  Nosotros
                </a>
                <a href="/soluciones" className="text-gray-700 hover:text-gray-900">
                  Soluciones
                </a>
                <a href="/contacto" className="text-gray-700 hover:text-gray-900">
                  Contacto
                </a>
              </div>
              <div className="md:hidden flex items-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <g fill="none">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path fill="currentColor" d="M20 17.5a1.5 1.5 0 0 1 .144 2.993L20 20.5H4a1.5 1.5 0 0 1-.144-2.993L4 17.5zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3zm0-7a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 1 1 0-3z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
