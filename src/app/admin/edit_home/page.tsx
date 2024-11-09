'use client'
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function EditHome() {
  interface InfoHome {
    titulo: string;
    parrafo: string;
    sponsor_link:string;
    sponsor_url:string;
    url_file_main: string;
    url_file_alert: string;
    url_file_plazos: string;
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
    sponsor_link:'',
    sponsor_url:'',
    url_file_main: '',
    url_file_alert: '',
    url_file_plazos: '',
    src: null,
    pdf: null,
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
    setInfoHome((prevInfoHome)=>({
      ...prevInfoHome,[name]:value
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
    <main className="py-24 md:py-24 px-1 md:px-24 text-gray-900">
      <div className="mb-6">
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

        <div className="p-2 border rounded-lg">
          <span className="uppercase font-bold">Sponsor</span>
          <label className="block mb-2">Link:</label>
          <input
            name="sponsor_link"
            value={infoHome.sponsor_link}
            onChange={handleInfoHomeChange}
            className="border p-2 w-full mb-4"
          />
          <label className="block mb-2">URL:</label>
          <input
            name="sponsor_url"
            value={infoHome.sponsor_url}
            onChange={handleInfoHomeChange}
            className="border p-2 w-full mb-4"
          />
        </div>
        <div className="flex my-6 items-center">
          <span className="text-red-500 px-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 12h8M9 8H6a4 4 0 1 0 0 8h3m6-8h3a4 4 0 0 1 0 8h-3"/></svg>
          </span>
          <label className="block font-bold">Archivo Principal:</label>
        </div>
        <div>
          <button className="bg-red-500  py-1 px-4 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m17.657 12l-1.414-1.414l2.121-2.122a2 2 0 1 0-2.828-2.828l-4.243 4.243a2 2 0 0 0 0 2.828l-1.414 1.414a4 4 0 0 1 0-5.657l4.242-4.242a4 4 0 0 1 5.657 5.657zM6.343 12l1.414 1.414l-2.121 2.122a2 2 0 1 0 2.828 2.828l4.243-4.243a2 2 0 0 0 0-2.828l1.414-1.414a4 4 0 0 1 0 5.657L9.88 19.778a4 4 0 1 1-5.657-5.657z"/></svg>
          </button>
          <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024"><path fill="currentColor" d="M544 864V672h128L512 480L352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64 624c0-123.136 93.12-223.488 212.608-237.248A239.81 239.81 0 0 1 512 192a239.87 239.87 0 0 1 235.456 194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6z"/></svg>
          </button>
        </div>
        <input
          name="src"
          value={infoHome.src}
          onChange={handleInfoHomeChange}
          className="border p-2 w-full mb-4 hidden"
        />
        <label className="block mb-2">PDF URL:</label>
        <input
          name="pdf"
          value={infoHome.pdf}
          onChange={handleInfoHomeChange}
          className="border p-2 w-full mb-4"
        />
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Enlace o PDF</label>
          <input
            type='text'
            value={href}
            onChange={(e) => setHref(e.target.value)}
            placeholder='Ingresa un enlace o sube un PDF'
            className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
          />
          <input
            type='file'
            onChange={handleFileChange}
            accept='application/pdf'
            className='mt-2 block text-sm text-gray-700'
          />
        </div>
      </div>

      <button onClick={handleSubmit} className="bg-primary text-white py-2 px-4">Save Changes</button>
    </main>
  );
}
