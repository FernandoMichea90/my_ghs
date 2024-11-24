'use client'
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import ButtonUrlFile from "@/components/ButtonUrlFile";
import SaveLinkOrFile from "@/Utils/Componentes/SaveLinkOrFile";

export default function EditHome() {
  interface InfoHome {
    titulo: string;
    parrafo: string;
    url_file_main: string;
    url_file_alert: string;
    url_file_plazos: string;
    url_file_sponsor: string;
    src: any;
    pdf: any;


  }

  interface ArrayInfoInt {
    texto: string;
    titulo: string;
    img: string;
  }

  const [infoHome, setInfoHome] = useState<InfoHome>({
    titulo: '',
    parrafo: '',
    url_file_main: '',
    url_file_alert: '',
    url_file_plazos: '',
    src: null,
    pdf: null,
    url_file_sponsor: ''

  });
  const [href, setHref] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [arrayInfo, setArrayInfo] = useState<ArrayInfoInt[]>([]);



  useEffect(() => {
    const fetchData = async () => {
      const infoDocRef = doc(db, "Home", "info");
      const arrayDocRef = doc(db, "Home", "arrayInfo");

      const infoDocSnap = await getDoc(infoDocRef);
      if (infoDocSnap.exists()) {
        setInfoHome(infoDocSnap.data() as InfoHome);
      }

      const arrayDocSnap = await getDoc(arrayDocRef);
      if (arrayDocSnap.exists()) {
        setArrayInfo(arrayDocSnap.data()?.arrayInfo || []);
      }
    };

    fetchData();
  }, []);

  const handleInfoHomeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfoHome((prevInfoHome) => ({
      ...prevInfoHome, [name]: value
    }))
  };

  const handleArrayInfoChange = (index: number, field: string, value: string) => {
    const updatedArrayInfo = arrayInfo.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setArrayInfo(updatedArrayInfo);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPdfFile(file);
  };

  const handleSubmit = async () => {
    const infoDocRef = doc(db, "Home", "info");
    const arrayDocRef = doc(db, "Home", "arrayInfo");

    await setDoc(infoDocRef, infoHome);
    await setDoc(arrayDocRef, { arrayInfo });

    alert("Home updated successfully!");
  };

  return (
    <main className="py-24 md:py-24  px-1 md:px-24  text-gray-900">
      <div className="bg-gray-100 p-3 mb-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Edit Home Information</h1>
        <label className="block mb-2">Titulo:</label>
        <input
          name="titulo"
          value={infoHome.titulo}
          onChange={handleInfoHomeChange}
          className="border p-2 w-full mb-4"
        />
        <label className="block mb-2">Texto:</label>
        <textarea
          name="parrafo"
          value={infoHome.parrafo}
          onChange={handleInfoHomeChange}
          className="border p-2 w-full mb-4"
        />

        <button onClick={handleSubmit} className="bg-blue-500 rounded text-white py-2 px-4">Guardar</button>
      </div>


      <SaveLinkOrFile archivo={infoHome} setArchivo={setInfoHome} titulo="Archivo Principal" nameArchivo="url_file_main" ></SaveLinkOrFile>
      <SaveLinkOrFile archivo={infoHome} setArchivo={setInfoHome} titulo="Sponsor" nameArchivo="url_file_alert" ></SaveLinkOrFile>
      <SaveLinkOrFile archivo={infoHome} setArchivo={setInfoHome} titulo="Alertas" nameArchivo="url_file_plazos" ></SaveLinkOrFile>
      <SaveLinkOrFile archivo={infoHome} setArchivo={setInfoHome} titulo="Plazos" nameArchivo="url_file_sponsor" ></SaveLinkOrFile>

    </main>
  );
}
