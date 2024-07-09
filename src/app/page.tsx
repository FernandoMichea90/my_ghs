import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between text-gray-900 py-24 md:py-24 px-1 md:px-24">
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">
          Recursos para GHS y Seguridad Química en Minería
        </h1>
        <p className="mb-4">
          Aquí encontrarás formatos de HDS para minerales y sustancias químicas, presentaciones, minutas explicativas, acceso a software libre y recursos que te ayudarán a cumplir con el reglamento GHS y facilitar el acceso a mercado de tus productos
        </p>
        <div className="flex">
          <button className="bg-primary text-white py-2 px-4 ">Ingresar</button>
          <input className="border border-primary p-2 w-full" placeholder="Ingresar tu email" />
        </div>
      </div>
      <div className="flex-1 p-4 hidden lg:block">
        <img className="w-full" src="./Imagen2.png" alt="Imagen descriptiva" />
      </div>
    </main>
  );
}
