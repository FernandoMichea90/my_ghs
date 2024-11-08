'use client'
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import ArrayInfoDiv from "@/Utils/Componentes/ArrayInfoDiv";

export default function Home() {
  interface InfoHome {
    titulo: string;
    parrafo: string;
    src: string;
    pdf: string;
  }

  interface ArrayInfoInt {
    texto: string;
    titulo: string;
    img: string;
  }

  const [infoHome, setInfoHome] = useState<InfoHome | null>(null);
  const [arrayInfo, setArrayInfo] = useState<ArrayInfoInt[] | null>(null);
  const [email, setEmail] = useState<string>("");
  const [showToast, setShowToast] = useState<Boolean>(false);
  const [cargando, setCargando] = useState<Boolean>(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    setCargando(true);
    var response= await saveEmail(email);
    if (response){
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setCargando(false);
        }, 3000);
    }
    setEmail("");

  }

  // funcion para guardar el correo  en la base de datos de firebase 
  const saveEmail = async (email: string) => {
    try {
      const emailDocRef = collection(db, "emailCollection");
      await addDoc(emailDocRef, { email: email, date: new Date() });
      return true
    } catch (error) {
      console.error("Error al guardar el correo", error);
      return false
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const infoDocRef = doc(db, "Home", "info");
      const arrayDocRef = doc(db, "Home", "arrayInfo");

      const infoDocSnap = await getDoc(infoDocRef);
      if (infoDocSnap.exists()) {
        setInfoHome(infoDocSnap.data() as InfoHome);
      } else {
        const initialInfoData: InfoHome = {
          titulo: "Recursos para GHS y Seguridad Química en Minería",
          parrafo: "Aquí encontrarás formatos de HDS para minerales y sustancias químicas, presentaciones, minutas explicativas, acceso a software libre y recursos que te ayudarán a cumplir con el reglamento GHS y facilitar el acceso a mercado de tus productos",
          src: "./image1.png",
          pdf: ""
        };
        await setDoc(infoDocRef, initialInfoData);
        setInfoHome(initialInfoData);
      }

      const arrayDocSnap = await getDoc(arrayDocRef);
      if (arrayDocSnap.exists()) {
        setArrayInfo(arrayDocSnap.data()?.arrayInfo || []);
      } else {
        const initialArrayData: ArrayInfoInt[] = [
          {
            texto: "Dive into Kaggle courses, competitions & forums.",
            titulo: "Learners",
            img: ""
          },
          {
            texto: "Dive into Kaggle courses, competitions & forums.",
            titulo: "Learners",
            img: ""
          },
          {
            texto: "Dive into Kaggle courses, competitions & forums.",
            titulo: "Learners",
            img: ""
          }
        ];
        await setDoc(arrayDocRef, { arrayInfo: initialArrayData });
        setArrayInfo(initialArrayData);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="py-24 md:py-24 px-1 md:px-24">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-25 right-10 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-300">
          ¡Correo guardado exitosamente!
        </div>

      )}




      <div className="flex items-center justify-between text-gray-900">

        <div className="flex-1 p-4">
          {infoHome ? (
            <>
              <h1 className="text-2xl font-bold mb-4">
                {infoHome.titulo}
              </h1>
              <p className="mb-4">
                {infoHome.parrafo}
              </p>
              <div className="w-full">
                <form onSubmit={handleSubmit} className="w-full  flex" >
                    <button 
                    className={`bg-primary text-white py-2 px-4 font-bold flex items-center justify-center ${cargando ? "opacity-50 cursor-not-allowed" : ""}`} 
                    disabled={cargando? true:false}
                    >
                    {cargando ? (
                      <>
                      <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                      Enviando
                      </>
                    ) : (
                      "Enviar"
                    )}
                    </button>
                  <input className="border border-primary p-2 w-full"
                    value={email}
                    type="email"
                    disabled={cargando? true:false}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresar tu email" required />
                    
                </form>
              </div>
            </>
          ) : (
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
              <div className="flex">
                <div className="h-10 bg-gray-300 rounded w-32 mr-4 "></div>
                <div className="h-10 bg-gray-300 rounded flex-1"></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 flex-col p-4 hidden lg:flex items-center">
          {infoHome ? (
            <>
              <img className="w-[75%]" src={infoHome.src} alt="Imagen descriptiva" />
              <a href={infoHome.pdf} className="text-center font-bold text-primary">
                Descargar
              </a>
            </>
          ) : (
            <div className="animate-pulse flex flex-col items-center" >
              <div className="h-64 bg-gray-300 rounded w-[300px] mb-`5" style={{ transform: 'rotate(0deg)' }}></div>
              <div className="h-6 bg-gray-300 rounded w-[300px] mt-5"></div>
            </div>
          )}
        </div>
      </div>
      <div className="my-10">

        {arrayInfo ?
          <h1 className="font-bold p-4 mb-5 text-gray-900">
            Who&apos;s on Kaggle
          </h1> :
          <div ></div>

        }
        <div className="flex flex-wrap w-100 justify-center">
          {arrayInfo ? (
            arrayInfo.map((response: ArrayInfoInt, index) => (
              <ArrayInfoDiv key={index} arrayInfo={response} />
            ))
          ) : (
            Array(3).fill(0).map((_, index) => (

              <div
                key={index}
                className="flex py-8 m-2 text-gray-900 w-full md:w-[28%] items-center animate-pulse"
              >
                <div className="w-[10vw] h-[10vh] bg-gray-300 rounded"></div>
                <div className="px-3 flex-1">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
              // <div key={index} className="animate-pulse w-64 p-4 m-2 bg-gray-300 rounded h-24"></div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
