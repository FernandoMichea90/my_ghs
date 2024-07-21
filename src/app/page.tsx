'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/config-global";
import ArrayInfoDiv from "@/Utils/Componentes/ArrayInfoDiv";

export default function Home() {

  const arrayInfoExample = [
    {
      texto: "Dive into Kaggle courses, competitions & forums.",
      titulo:"Learners",
      img: ""
    },
    {
      texto: "Dive into Kaggle courses, competitions & forums.",
      titulo:"Learners",
      img: ""
    },
    {
      texto: "Dive into Kaggle courses, competitions & forums.",
      titulo:"Learners",
      img: ""
    }
   
  ]

  interface arrayInfoInt{
    texto:string,
    titulo:string
    img:string
  }

  const [arrayInfo, setArrayInfo] = useState<arrayInfoInt[]>(arrayInfoExample)

  useEffect(() => {
    console.log('Variables de entorno');
    console.log(BASE_URL);
  }, [])

  return (
    <main className="py-24 md:py-24 px-1 md:px-24">
      {/* min-h-screen */}
      <div className="flex  items-center justify-between text-gray-900">
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
        <div className="flex-1 flex-col p-4 hidden lg:flex items-center">
          <img className="w-[75%]" src="./image1.png" alt="Imagen descriptiva" />
          <a href="#" className="text-center font-bold text-primary">
            Descargar
          </a>
        </div>
      </div>
        <div className="my-10">
            <h1 className="font-bold p-4 mb-5 text-gray-900">
              Who's on Kaggle
            </h1>
            <div className="flex flex-wrap w-100 justify-center">
              {
                arrayInfo.length>0 && arrayInfo.map((response:arrayInfoInt,index)=>(
                  <ArrayInfoDiv key={index} arrayInfo={response}></ArrayInfoDiv>
                )) 
              }
            </div>
        </div>
    </main>
  );
}
