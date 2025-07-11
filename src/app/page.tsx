'use client'
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import ArrayInfoDiv from "@/Utils/Componentes/ArrayInfoDiv";
import { getHref } from "@/Utils/urlHelpers";
import { url } from "inspector";
import 'react-quill/dist/quill.snow.css';


export default function Home() {
  interface InfoHome {
    titulo: string;
    parrafo: string;
    src: string;
    pdf: string;
    url_file_main: string;
    url_file_alert: string;
    url_file_plazos: string;
    url_file_sponsor: string;
    actualizacion: Timestamp | null;
    text_sponsor: string;
    url_sponsor: string;
    titulo_dos: string;
    pie_de_pagina:string;
  }

  interface ArrayInfoInt {
    texto: string;
    titulo: string;
    img: string;
  }

  const [infoHome, setInfoHome] = useState<InfoHome | null>(null);
  const [arrayInfo, setArrayInfo] = useState<ArrayInfoInt[] | null>(null);
  const [email, setEmail] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [cargando, setCargando] = useState<boolean>(false);
  const estilo_div: React.CSSProperties = {
    display: "grid",
    minHeight: "100dvh",
    gridTemplateRows: "1fr auto",
  };

  const estilo_main = "pt-24 md:pt-24 px-1 md:px-24"
  const estilo_main_cargando = "py-24 md:py-24 px-1 md:px-24"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Validar formato de email
    if (!isValidEmail(email)) {
      alert("Por favor, ingresa un email válido");
      return;
    }

    setCargando(true);

    try {
      const success = await saveEmail(email);
      if (success) {
        setShowToast(true);
        setEmail("");
        // Abrir el archivo después de guardar el email
        if (infoHome?.url_file_main) {
          window.open(infoHome.url_file_main, '_blank');
        }
      }
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
    } finally {
      setTimeout(() => {
        setShowToast(false);
        setCargando(false);
      }, 3000);
    }
  }

  const changeTimestampDate = (time_actualizacion: Timestamp) => {
    var fecha_actualizacion = time_actualizacion
    return fecha_actualizacion
  }

  function formatDate(timestamp: Timestamp | null): string {
    if (!timestamp) return 'Sin fecha';

    const date = new Date(timestamp.toDate());
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'short' }).toLowerCase();

    return `${day}-${month}`;
  }

  // Función para validar formato de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
          pdf: "",
          url_file_main: "",
          url_file_alert: "",
          url_file_sponsor: "",
          url_file_plazos: "",
          text_sponsor: "",
          url_sponsor: "",
          actualizacion: null,
          titulo_dos: "",
          pie_de_pagina: ""
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
    <main className="flex w-full h-screen" >
      <div style={estilo_div} className="w-full md:w-3/5 px-1 md:px-24">
        <div className={infoHome ? "m-auto" : "m-auto w-full"} >
          {/* Toast */}
          {showToast && (
            <div className="fixed top-25 right-10 bg-green-500 text-white py-2 px-4 rounded shadow-lg transition-opacity duration-300">
              ¡Correo guardado exitosamente!
            </div>

          )}

          <div className="flex items-center justify-between text-gray-900">

            <div className="flex-1 p-4 mt-[14px] md:mt-0">
              {infoHome ? (
                <>
                  <div className="text-center ql-editor" style={{ padding: "12px 0px" }} dangerouslySetInnerHTML={{ __html: infoHome.titulo_dos }}></div>


                  <p className="mb-4">
                    {infoHome.parrafo}
                  </p>
                  <div className="w-full flex justify-center items-center align-middle">
                    <div className="flex-1 flex" id="prueba">
                      <form onSubmit={handleSubmit} className="flex w-[80%]">
                        <div className="flex rounded-lg overflow-hidden border border-primaryVerde w-full">
                          <input
                            type="email"
                            placeholder="Ingresa tu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 outline-none border-none focus:ring-0 w-full"
                            required
                          />
                          <button
                            type="submit"
                            className={`bg-primaryVerde text-white py-2 px-8 flex items-center ${cargando || !email || !isValidEmail(email) ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"}`}
                            disabled={cargando || !email || !isValidEmail(email)}

                          >
                            {cargando ? (
                              <>
                                <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                Descargando
                              </>
                            ) : (
                              "Descargar"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {infoHome && infoHome.url_sponsor && infoHome.text_sponsor &&

                    <div className="flex items-center justify-center mb-4 mt-2">
                      <span className="flex-1  pr-2 text-primaryVerde">
                        {"Aprende más: "}

                        <a className="text-primaryVerde underline" href={infoHome.url_sponsor} target="_blank">
                          {infoHome.text_sponsor}
                        </a>
                      </span>
                    </div>

                  }
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

                <div className="flex md:hidden items-center justify-center mr-[100px] w-full p-10">
                 {infoHome?.src && (
                   <img
                     className="max-h-[24rem] transform -rotate-20 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                     style={{
                       transform: 'rotate(-20deg)',
                       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                       filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
                     }}
                     src={infoHome.src}
                     alt="PDF Preview"
                   />
                 )}
               </div>
              
            </div>

          </div>
        </div>
        <div className="flex justify-center items-center">
                {/* pie de pagina */}
                {infoHome?.pie_de_pagina && (
                  <div className="text-center ql-editor" style={{ padding: "20px 0px" }} dangerouslySetInnerHTML={{ __html: infoHome?.pie_de_pagina }}></div>
                )}
        </div>

      </div>

      <div className="hidden md:flex w-2/5 bg-primaryVerde items-center justify-center">
        <div className="flex items-center justify-center mr-[235px]">
          {infoHome?.src && (
            <img
              className="max-h-[35rem] transform -rotate-10 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              style={{
                transform: 'rotate(-10deg)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
              }}
              src={infoHome.src}
              alt="PDF Preview"
            />
          )}
        </div>
      </div>

      
    </main>
  );
}
