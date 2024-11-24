'use client';

import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import dynamic from 'next/dynamic';
import {formats,modules} from '@/lib/quillconfig'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

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
            modules={{
              toolbar: [
                [{ 'header': '1'}, { 'header': '2' }, { 'header': [1,2,3, 4, 5, 6] }], // Encabezados
                [{ 'font': [] }], // Familia de fuente
                [{ 'size': ['small', false, 'large', 'huge'] }], // Tamaño de fuente
                ['bold', 'italic', 'underline', 'strike'], // Estilo de texto
                [{ 'color': [] }, { 'background': [] }], // Color de texto y fondo
                [{ 'script': 'sub' }, { 'script': 'super' }], // Subíndice/Superíndice
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Listas
                [{ 'indent': '-1' }, { 'indent': '+1' }], // Sangría
                [{ 'direction': 'rtl' }], // Dirección de texto
                [{ 'align': [] }], // Alineación de texto
                ['link', 'image', 'video'], // Insertar
                ['blockquote', 'code-block'], // Citas y código
                ['clean'] // Limpiar formato
              ],
              
            }} // Configuración personalizada
            formats={[  
              'align',
              'background',
              'blockquote',
              'bold',
              'bullet',
              'code',
              'code-block',
              'color',
              'direction',
              'font',
              'formula',
              'header',
              'indent',
              'italic',
              'link',
              'list',
              'script',
              'size',
              'strike',
              'table',
              'underline',
              'image',
              'video'
            ]} // Formatos personalizados
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
