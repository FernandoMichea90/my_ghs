'use client'
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore"; 

export default function EditHome() {
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

  const [infoHome, setInfoHome] = useState<InfoHome>({
    titulo: "",
    parrafo: "",
    src: "",
    pdf: ""
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
    setInfoHome({
      ...infoHome,
      [e.target.name]: e.target.value,
    });
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
    <main className="py-24 md:py-24 px-1 md:px-24 n text-gray-900 ">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Edit Home Information</h1>
        <label className="block mb-2">Title:</label>
        <input
          name="titulo"
          value={infoHome.titulo}
          onChange={handleInfoHomeChange}
          className="border p-2 w-full mb-4"
        />
        <label className="block mb-2">Paragraph:</label>
        <textarea
          name="parrafo"
          value={infoHome.parrafo}
          onChange={handleInfoHomeChange}
          className="border p-2 w-full mb-4"
        />
        <label className="block mb-2">Image URL:</label>
        <input
          name="src"
          value={infoHome.src}
          onChange={handleInfoHomeChange}
          className="border p-2 w-full mb-4"
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

      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Edit Array Information</h1>
        {arrayInfo.map((item, index) => (
          <div key={index} className="mb-4 border p-4">
            <label className="block mb-2">Title:</label>
            <input
              value={item.titulo}
              onChange={(e) => handleArrayInfoChange(index, "titulo", e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">Text:</label>
            <textarea
              value={item.texto}
              onChange={(e) => handleArrayInfoChange(index, "texto", e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <label className="block mb-2">Image URL:</label>
            <input
              value={item.img}
              onChange={(e) => handleArrayInfoChange(index, "img", e.target.value)}
              className="border p-2 w-full mb-4"
            />
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="bg-primary text-white py-2 px-4">Save Changes</button>
    </main>
  );
}
