'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '@/lib/quillconfig';
import '@/app/nosotros/nosotros.css';


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditNosotrosPage = () => {
  const [nosotrosText, setNosotrosText] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNosotrosData = async () => {
      try {
        const nosotrosRef = collection(db, 'Nosotros');
        const querySnapshot = await getDocs(nosotrosRef);
        const firstDoc = querySnapshot.docs[0];

        if (firstDoc) {
          const data = firstDoc.data();
          const htmlContent = data.html || '';
          setNosotrosText(htmlContent);
        }
      } catch (error) {
        console.error('Error fetching nosotros data:', error);
        setError('Error al cargar los datos.');
      }
    };

    fetchNosotrosData();
  }, []);

  const handleEditorChange = (content: string) => {
    console.log(content)
    setNosotrosText(content);
  };

  const saveContent = async () => {
    try {
      const nosotrosRef = collection(db, 'Nosotros');
      const querySnapshot = await getDocs(nosotrosRef);
      const firstDoc =  querySnapshot.docs[0];
    console.log("primera prueba")
    console.log(firstDoc)
      if (firstDoc) {

        const docRef = doc(db, 'Nosotros', firstDoc.id);
        await updateDoc(docRef, { html: nosotrosText });
        alert('Contenido guardado con éxito');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setError('Error al guardar los cambios.');
    }
  };

  return (
    <div className='flex min-h-screen flex-col  justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
      {error && <div className='text-red-500 mb-4'>{error}</div>}
      {isEditing ? (
        <div className='w-full'>
          <ReactQuill
            value={nosotrosText}
            onChange={handleEditorChange}
            theme='snow'
            modules={modules}
            formats={formats}
          />
          <div className='mt-4'>
            <button
              onClick={()=>saveContent()}
              className='bg-blue-500 text-white p-2 rounded'
            >
              Guardar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className='ml-4 bg-gray-500 text-white p-2 rounded'
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div
            id='nosotros'
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: nosotrosText }}
          />
          <button
            onClick={() => setIsEditing(true)}
            className='mt-4 bg-blue-500 text-white p-2 rounded'
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default EditNosotrosPage;
