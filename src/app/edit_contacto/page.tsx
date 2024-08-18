'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import {formats,modules} from '@/lib/quillconfig'


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const AdminPage = () => {
  const [contactoText, setContactoText] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchContactoData = async () => {
      try {
        const contactoRef = collection(db, 'Contacto');
        const querySnapshot = await getDocs(contactoRef);
        const firstDoc = querySnapshot.docs[0];

        if (firstDoc) {
          const data = firstDoc.data();
          const htmlContent = data.html || '';
          setContactoText(htmlContent);
        }
      } catch (error) {
        console.error('Error fetching contacto data:', error);
      }
    };

    fetchContactoData();
  }, []);

  const handleEditorChange = (content: string) => {
    setContactoText(content);
  };

  const saveContent = async () => {
    try {
      const contactoRef = collection(db, 'Contacto');
      const querySnapshot = await getDocs(contactoRef);
      const firstDoc = querySnapshot.docs[0];

      if (firstDoc) {
        const docRef = doc(db, 'Contacto', firstDoc.id);
        await updateDoc(docRef, {
          html: contactoText
        });
        alert('Contenido guardado con éxito');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-between text-gray-500 py-24 md:py-24 px-10 md:px-24'>
      {isEditing ? (
        <div className='w-full'>
          <ReactQuill
            value={contactoText}
            onChange={handleEditorChange}
            theme='snow'
            modules={modules} // Configuración personalizada
            formats={formats} // Formatos personalizados
          />
          <button
            onClick={saveContent}
            className='mt-4 bg-blue-500 text-white p-2 rounded'
          >
            Guardar
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className='mt-4 ml-4 bg-gray-500 text-white p-2 rounded'
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div>
          <div
            id='contacto'
            dangerouslySetInnerHTML={{ __html: contactoText }}
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

export default AdminPage;
